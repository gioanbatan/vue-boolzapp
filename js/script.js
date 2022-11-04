const { createApp } = Vue;
const dt = luxon.DateTime;

createApp({
    data() {
        return {
            searchContact: "",
            activeContact: 0,
            chatText: "",
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: '_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: '_8',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ]
        }
    },
    created() {
        console.log("Ecchime!");
        console.log(this.actualHour());
    },
    methods: {
        addNewMessage() {
            this.chatText = this.chatText.trim();
            console.log("Text", this.chatText, typeof(this.chatText), (this.chatText === true ? "true" : "false"));
            if (this.chatText) {
                // Compose message object with user text and status "sent"
                const newMessage = this.composeMessage(this.chatText, 'sent');

                console.log("Active", this.activeContact);
                console.log("CONT", this.contacts[this.activeContact].messages[1].message);

                this.contacts[this.activeContact].messages.push(newMessage);

                this.scrollToBottom();
                // Clear user text input
                this.chatText = "";
                
                // Auto answer after one second
                this.addNewAnswer();

                this.scrollToBottom();
            }
        },
        composeMessage(messageText, statusType) {
            const message = {
                date: this.actualHour(),
                message: messageText,
                status: statusType,
            }
            return message;
        },
        addNewAnswer() {
            const activeContactAnswering = this.activeContact;
            const timeAnswer = setTimeout( () => {
                console.log("voilà");
                // Answer array
                const textMessage = ["Si!", "No!", "Forse", "Mah, io non saprei...", "Ma che problema hai?", "AHAHAHAHhahahah!!!", "No, no, neanche per idea!", "Eh, vabbé!", "Grande!", "Noooooo!"];
                // Generate a random number
                const answerNumber = this.generateRndNumber(0, textMessage.length - 1);
                // Insert a random text in message
                const answer = this.composeMessage (textMessage[answerNumber], 'received');

                this.contacts[activeContactAnswering].messages.push(answer);
                }, 1000);
        },
        generateRndNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1) ) + min;
        },
        actualHour() {
            const now = dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS)
            return now;
        },
        scrollToBottom() {
            // const element = document.querySelector(".main-chat");
            // console.log("scroll", element);
            // element.scrollIntoView(false);
            // this.$nextTick(() => {
            //     this.scrolltoEnd();
            // });
        },
        showFoundContacts() {
            if (this.searchContact) {
                this.contacts.forEach(element => {
                    const search = this.searchContact.toLowerCase();
                    const name = element.name.toLowerCase();
                    console.log(search, typeof(search));
                    console.log(name, typeof(name));
                    if (name.startsWith(search)) {
                        element.visible = true;
                    } else {
                        element.visible = false;
                    }
                });
            } else {
                this.contacts.forEach(element => {
                    element.visible = true;
                })
            }
        }
    }
}).mount("#app");