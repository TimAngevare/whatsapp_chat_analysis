var dataJSON = {};

// Function to create a message bubble
function createMessageBubble(person) {
    const bubble = document.createElement('div');
    bubble.className = 'message-container';
    bubble.innerHTML = `
        <div class="message-bubble">
            <div class="message-header">
                <span class="message-content sender-name">${person.name}</span>
            </div>
            <div class="message-content">
                ${person.first_message.message}
            </div>
            <div class="message-footer">
                <span class="timestamp">${person.first_message.timeStamp}</span>
            </div>
        </div>
    `;
    return bubble;
}

fetch('./data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        dataJSON = data;
        analyse();
        // Display total messages
       //document.getElementById('totalMessages').innerText = `Total Messages: ${dataJSON.total_messages}`;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

function analyse(){
        // Pie Chart for Messages Sent by Person
        var messages = dataJSON.people.map(person => person.count);
        var person = dataJSON.people.map(person => person.name);

        var pieOptions = {
            series: messages,
            chart: {
                type: 'pie',
            },
            labels: person
        }

        var senderChart = new ApexCharts(document.getElementById('sender'), pieOptions);
        senderChart.render();

        // Heat Map for Messages Sent by Hour and Day
        const series = [];
        for (let day = 1; day <= 7; day++) {
            if (dataJSON.time[day]) {
                series.push({
                    name: getDayName(day),
                    data: Array.from({length: 24}, (_, hour) => ({
                        x: `${hour}:00`,
                        y: dataJSON.time[day][hour] || 0
                    }))
                });
            }
        }

        const heatMapOptions = {
            series: series,
            chart: {
                height: 350,
                type: 'heatmap',
            },
            dataLabels: {
                enabled: false
            },
            colors: ["#008FFB"],
            title: {
                text: 'Berichten frequentie'
            },
            xaxis: {
                type: 'category',
                tickAmount: 24,
                labels: {
                    formatter: (val) => val
                }
            }
        }

        const heatMapChart = new ApexCharts(document.getElementById('heatMap'), heatMapOptions);
        heatMapChart.render();

        // Create message bubbles for each person
        const firstMessageContainer = document.getElementById('firstMessage');
        dataJSON.people.forEach(person => {
            const messageBubble = createMessageBubble(person);
            firstMessageContainer.appendChild(messageBubble);
        });
        const table = document.getElementById('wordTable');

        // Sort the words by frequency in descending order
        const sortedWords = Object.entries(dataJSON.words).sort((a, b) => b[1] - a[1]);

        // Create and append table rows
        sortedWords.forEach(([word, frequency]) => {
            const row = table.insertRow();
            const cellWord = row.insertCell(0);
            const cellFrequency = row.insertCell(1);
            cellWord.textContent = word;
            cellFrequency.textContent = frequency;
        });

}

function getDayName(day) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[day - 1];
}