document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
    document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
    document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
    document.querySelector('#compose').addEventListener('click', compose_email);

    document.querySelector('#compose-form').addEventListener('submit', send_email);

    load_mailbox('inbox');
});

function compose_email(reply_to = null) {
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'block';
    document.querySelector('#email-detail-view').style.display = 'none';

    document.querySelector('#compose-recipients').value = '';
    document.querySelector('#compose-subject').value = '';
    document.querySelector('#compose-body').value = '';

    if (reply_to) {
        document.querySelector('#compose-recipients').value = reply_to.sender;
        let subject = reply_to.subject;
        if (!subject.startsWith("Re: ")) {
            subject = "Re: " + subject;
        }
        document.querySelector('#compose-subject').value = subject;
        document.querySelector('#compose-body').value =
            `\n\nOn ${reply_to.timestamp} ${reply_to.sender} wrote:\n${reply_to.body}`;
    }
}

function load_mailbox(mailbox) {
    document.querySelector('#emails-view').style.display = 'block';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#email-detail-view').style.display = 'none';

    document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

    fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => {
        emails.forEach(email => {
            const element = document.createElement('div');
            element.className = 'list-group-item email-item';
            element.style.backgroundColor = email.read ? '#e9ecef' : 'white';
            element.style.cursor = 'pointer';
            element.style.padding = '15px';
            element.style.borderLeft = '4px solid #007bff';

            element.innerHTML = `
                <div class="d-flex w-100 justify-content-between">
                    <strong>${mailbox === 'sent' ? email.recipients.join(', ') : email.sender}</strong>
                    <small>${email.timestamp}</small>
                </div>
                <p class="mb-1">${email.subject || '(no subject)'}</p>
            `;

            element.addEventListener('click', () => view_email(email.id, mailbox));
            document.querySelector('#emails-view').append(element);
        });
    });
}

function view_email(email_id, mailbox) {
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#email-detail-view').style.display = 'block';

    fetch(`/emails/${email_id}`)
    .then(response => response.json())
    .then(email => {
        document.querySelector('#email-detail-view').innerHTML = `
            <div class="card mt-3">
                <div class="card-header">
                    <h5>${email.subject || '(no subject)'}</h5>
                </div>
                <div class="card-body">
                    <p><strong>From:</strong> ${email.sender}</p>
                    <p><strong>To:</strong> ${email.recipients.join(', ')}</p>
                    <p><strong>Timestamp:</strong> ${email.timestamp}</p>
                    <hr>
                    <pre style="white-space: pre-wrap;">${email.body}</pre>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary btn-sm" id="reply-btn">Reply</button>
                    ${mailbox !== 'sent' ?
                        `<button class="btn btn-${email.archived ? 'success' : 'warning'} btn-sm" id="archive-btn">
                            ${email.archived ? 'Unarchive' : 'Archive'}
                        </button>` : ''
                    }
                </div>
            </div>
        `;

        if (!email.read) {
            fetch(`/emails/${email_id}`, {
                method: 'PUT',
                body: JSON.stringify({ read: true })
            });
        }

        if (document.querySelector('#archive-btn')) {
            document.querySelector('#archive-btn').addEventListener('click', () => {
                fetch(`/emails/${email_id}`, {
                    method: 'PUT',
                    body: JSON.stringify({ archived: !email.archived })
                }).then(() => load_mailbox('inbox'));
            });
        }

        document.querySelector('#reply-btn').addEventListener('click', () => compose_email(email));
    });
}

function send_email(event) {
    event.preventDefault();

    fetch('/emails', {
        method: 'POST',
        body: JSON.stringify({
            recipients: document.querySelector('#compose-recipients').value,
            subject: document.querySelector('#compose-subject').value,
            body: document.querySelector('#compose-body').value
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.message) {
            load_mailbox('sent');
        } else {
            alert(result.error || 'خطا در ارسال ایمیل');
        }
    });
}
