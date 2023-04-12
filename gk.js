fetch('https://the-trivia-api.com/api/questions?limit=5')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        const quizContainer = document.getElementById('quiz-container');

        data.forEach((question, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.style.marginBottom = '20px';

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const questionHeading = document.createElement('h5');
            questionHeading.classList.add('card-title');
            const questionTextNode = document.createTextNode(`${index + 1}. ${question.question}`);
            questionHeading.appendChild(questionTextNode);

            cardBody.appendChild(questionHeading);

            const answerOptions = question.incorrectAnswers.concat(question.correctAnswer);
            for (let i = answerOptions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [answerOptions[i], answerOptions[j]] = [answerOptions[j], answerOptions[i]];
            }

            const answerList = document.createElement('ul');
            answerList.classList.add('list-group', 'list-group-flush');

            answerOptions.forEach((answerOption) => {
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item');

                const button = document.createElement('button');
                const buttonText = document.createTextNode(answerOption);
                button.appendChild(buttonText);
                button.classList.add('list-group-item', 'list-group-item-action');
                button.style.width = '100%';
                listItem.appendChild(button);
                answerList.appendChild(listItem);

                button.addEventListener('click', (event) => {
                    const buttons = listItem.parentNode.querySelectorAll('button');
                    buttons.forEach((button) => {
                        if (button === event.target) {
                            button.classList.add('active');
                            if (answerOption === question.correctAnswer) {
                                console.log('Correct!');
                            } else {
                                console.log('Incorrect!');
                            }
                        } else {
                            button.classList.remove('active');
                        }
                    });
                });
            });

            cardBody.appendChild(answerList);
            card.appendChild(cardBody);
            quizContainer.appendChild(card);
        });

        const checkAnswersButton = document.createElement('button');
        const buttonText = document.createTextNode('Check Answers');
        checkAnswersButton.appendChild(buttonText);
        checkAnswersButton.classList.add('btn', 'btn-primary');

        // Create a container element for the button
        const buttonContainer = document.createElement('div');

        // Add the Bootstrap class 'text-center' to center the button
        buttonContainer.classList.add('text-center');

        // Append the button to the container
        buttonContainer.appendChild(checkAnswersButton);

        // Append the container to the quiz container
        quizContainer.appendChild(buttonContainer);


        // Create a new element to display the score
        const scoreDisplay = document.createElement('div');
        quizContainer.appendChild(scoreDisplay);

checkAnswersButton.addEventListener('click', () => {
    data.forEach((question, index) => {
        const card = quizContainer.children[index];
        const answerListItem = card.querySelector('ul.list-group');
        const buttons = answerListItem.querySelectorAll('button');
        let isCorrectAnswerSelected = false;

        buttons.forEach((button) => {
            if (button.classList.contains('active') && button.textContent === question.correctAnswer) {
                isCorrectAnswerSelected = true;
            }

            // Disable the button
            button.disabled = true;
        });

        const correctAnswerButton = Array.from(buttons).find(button => button.textContent === question.correctAnswer);
        correctAnswerButton.classList.add('list-group-item-success');

        if (!isCorrectAnswerSelected) {
            correctAnswerButton.style.backgroundColor = 'green';

            // Change the wrong answer to red
            const selectedButton = Array.from(buttons).find(button => button.classList.contains('active'));
            if (selectedButton) {
                selectedButton.classList.add('list-group-item-danger');
            
            }
        }
    });

    // Disable the Check Answers button
    checkAnswersButton.disabled = true;
});

        
        
        

    })
    .catch(error => {
        console.error('Error retrieving quiz questions:', error);
    });
