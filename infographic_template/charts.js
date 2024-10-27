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
        polarityChart();
        analyse();
        // Display total messages
       //document.getElementById('totalMessages').innerText = `Total Messages: ${dataJSON.total_messages}`;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

function transformDataPolarity(data) {
    return data.people.map(person => ({
        x: person.name,
        y: person.polarity
    }));
}    

function polarityChart(){
    const transformedData = transformDataPolarity(dataJSON);

// Create the chart configuration
    const chartConfig = {
        chart: {
            type: "boxPlot"
        },
        series: [{
            data: transformedData
        }],
        plotOptions: {
            bar: {
              horizontal: true
            }
        }
    };
    var chart = new ApexCharts(document.getElementsByClassName('polarity-container')[0], chartConfig);

    chart.render();
}

function getDayName(day) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[day - 1];
}

function createEmojiCharts() {
    // Display total emoji count
    const totalEmojisElement = document.getElementById('totalEmojis');
    totalEmojisElement.innerHTML = `Total Emojis Used: ${dataJSON.emoji_stats.total_emoji_count}`;

    // Create chart for top emojis
    const emojiData = Object.entries(dataJSON.emoji_stats.top_emojis).map(([emoji, count]) => ({
        x: emoji,
        y: count
    }));

    const emojiChartOptions = {
        series: [{
            name: 'Usage Count',
            data: emojiData
        }],
        chart: {
            type: 'bar',
            height: 250,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            }
        },
        colors: ['#a8dadc'],
        xaxis: {
            categories: emojiData.map(d => d.x),
            labels: {
                style: {
                    fontSize: '16px'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#ffffff'
                }
            }
        }
    };

    const emojiChart = new ApexCharts(document.getElementById('emojiChart'), emojiChartOptions);
    emojiChart.render();

    // Create per-person emoji statistics
    const emojiPerPersonContainer = document.getElementById('emojiPerPerson');
    const personContainer = document.createElement('div');
    personContainer.className = 'emoji-person-container';

    dataJSON.people.forEach(person => {
        const personCard = document.createElement('div');
        personCard.className = 'emoji-person-card';
        
        // Create header with person name
        const header = document.createElement('h5');
        header.textContent = person.name;
        header.style.marginBottom = '10px';
        
        // Create emoji bars
        const emojiContent = Object.entries(person.emoji_stats.top_emojis)
            .map(([emoji, count]) => {
                const maxCount = Math.max(...Object.values(person.emoji_stats.top_emojis));
                const percentage = (count / maxCount) * 100;
                
                return `
                    <div class="emoji-bar">
                        <span class="emoji">${emoji}</span>
                        <div class="emoji-progress">
                            <div class="emoji-progress-bar" style="width: ${percentage}%"></div>
                        </div>
                        <span class="count">${count}</span>
                    </div>
                `;
            })
            .join('');

        personCard.innerHTML = `
            ${header.outerHTML}
            <div class="emoji-content">
                ${emojiContent}
            </div>
            <div class="emoji-total">
                Total: ${person.emoji_stats.total_emoji_count}
            </div>
        `;

        personContainer.appendChild(personCard);
    });

    emojiPerPersonContainer.appendChild(personContainer);
}

function analyse(){
    document.getElementById('totalMessages').innerText = 'Verdeling van de totale ' + String(dataJSON.total_messages) + ' berichten';
    var messages = dataJSON.people.map(person => person.count);
    var person = dataJSON.people.map(person => person.name);

    document.getElementById('chatTitle').innerText = 'De chat tussen ' + person.join(', ')

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

    createEmojiCharts();

}