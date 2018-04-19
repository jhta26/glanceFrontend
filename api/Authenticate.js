export default function Authenticate(logIn) {
    return fetch(`http://localhost:8000/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: logIn.username,
                password: logIn.password
            })
        })
        .then(res => {
            return res.json();
        })
        .then(record => {
            return {
                token: record.token
            };
        });
}