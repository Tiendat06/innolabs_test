class Log{

    login = () => {
        $('#btn-login').click(() => {
            const email = $('#email').val();
            const pwd = $('#pwd').val();

            fetch('/log/login', {
                method: 'POST',
                body: JSON.stringify({
                    email, password: pwd
                }),
                headers:{
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(err => {
                    console.error(err);
                })
        })
    }
}

export default new Log;