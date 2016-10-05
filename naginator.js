function naginator(home, stateMachine, date) {
    // If no date specified, nag once a day
    date = date || (new Date().toISOString().slice(0, 10).replace(/-/g, ''));

    if (localStorage.getItem('nagDate') >= date)
        location.href = home;
    else
        setState('start');

    return; // From here on it's just impelmentation

    function setState(state) {
        document.body.innerHTML = ''; // Clear previous state

        stateMachine[state].text.forEach(function (t) {
            var h1 = document.createElement('h1');
            h1.textContent = t;
            document.body.appendChild(h1);
        });

        if (stateMachine[state].buttons) {
            stateMachine[state].buttons.forEach(function (info) {
                var b = document.createElement('button');
                b.onclick = function () { setState(info.state) };
                b.textContent = info.text;
                document.body.appendChild(b);
            });
        }
        else { // An end state
            localStorage.setItem('nagDate', date);
            var counter = document.createElement('h2');
            document.body.appendChild(counter);
            function count(remaining) {
                if (!remaining) {
                    location.href = home;
                    return;
                }
                counter.textContent = remaining;
                setTimeout(count, 1000, remaining - 1)
            }
            count(3);
        }
    }
}