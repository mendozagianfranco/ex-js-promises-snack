// 🏆 Snack 1
// Ottieni il titolo di un post con una Promise.

// Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise che recupera il titolo di un post dal link https://dummyjson.com/posts/{id}
// 🎯 Bonus: Ottieni l'intero post con l'autore
// Crea una funzione getPost(id) che recupera l'intero post. Concatena una seconda chiamata che aggiunge una proprietà user che contiene i dati dell'autore, recuperati dalla chiamata https://dummyjson.com/users/{post.userId}.

// function getPostTitle(id) {
//     return new Promise((resolve, reject) => {
//         fetch(`https://dummyjson.com/posts/${id}`)
//             .then(response => response.json())
//             .then(data => resolve(data.title))
//             .catch(reject);
//     });
// }

// getPostTitle(1)
//     .then(data => console.log(data))
//     .catch(error => console.error(error));


// function getPost(id) {
//     return new Promise((resolve, reject) => {
//         fetch(`https://dummyjson.com/posts/${id}`)
//             .then(response => response.json())
//             .then(post => {
//                 fetch(`https://dummyjson.com/users/${post.userId}`)
//                     .then(response => response.json())
//                     .then(user => resolve({ ...post, user }))
//                     .catch(reject);
//             })
//             .catch(reject);
//     });

// }

// getPost(1)
//     .then(data => console.log(data))
//     .catch(error => console.error(error));

// 🏆 Snack 2
// Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi, genera un numero casuale tra 1 e 6. Tuttavia, nel 20 % dei casi, il dado si "incastra" e la Promise va in reject.
// 🎯 Bonus: HOF con closure per memorizzare l'ultimo lancio
// Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato. Se il numero esce due volte di fila, stampa "Incredibile!".

// function lanciaDado() {
//     return new Promise((resolve, reject) => {
//         console.log('Lanciando il dado...');

//         setTimeout(() => {
//             const stuckPossibility = Math.random < 0.2;
//             if (stuckPossibility) {
//                 reject('Il dato si è incastrato');
//             } else {
//                 const randomNum = Math.floor(Math.random() * 6) + 1;
//                 resolve(`E uscito il numero ${randomNum}`);
//             }

//         }, 3000);
//     });
// }

// lanciaDado()
//     .then(message => console.log(message))
//     .catch(error => console.error(error));


function creaLanciaDado() {

    let lastNum = null;

    return function () {
        return new Promise((resolve, reject) => {
            console.log('Lanciando il dado...');

            setTimeout(() => {
                const stuckPossibility = Math.random() < 0.2;
                if (stuckPossibility === 1) {
                    lastNum = null;
                    reject('Il dato si è incastrato');
                } else {
                    const randomNum = Math.floor(Math.random() * 6) + 1;
                    if (lastNum === randomNum) {
                        console.log(`Incredibile è uscito ancora ${randomNum}`);
                    }
                    lastNum = randomNum;
                    resolve(`E uscito il numero ${randomNum}`);
                }
            }, 3000);
        });
    };
}

const lancio = creaLanciaDado();

lancio()
    .then(message => console.log(message))
    .catch(error => console.error(error));
