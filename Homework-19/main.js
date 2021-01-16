var mainBtn = document.getElementById('main-btn'),
    btnsSettings = document.getElementsByClassName('btns-setting')[0],
    mnt = document.getElementsByClassName('minutes')[0],
    scd = document.getElementsByClassName('seconds')[0],
    ms = document.getElementsByClassName('milliseconds')[0],
    stopwatch = document.getElementsByClassName('watch')[0],
    timer;

var msStart = 0,
    scdStart = 0,
    mntStart = 0;

function watch() {
    msStart++;
    if (msStart === 100) {
        msStart = 0;
        scdStart++;
    }

    if (scdStart === 60) {
        scdStart = 0;
        mntStart++;
    }

    if (mntStart === 60) {
        clearInterval(timer);
        saveBtn.classList.add('btns-setting');
    }
    
    ms.innerHTML ='0' + msStart;
    if (msStart > 9) {
        ms.innerHTML = msStart;
    }

    scd.innerHTML ='0' + scdStart;
    if (scdStart > 9) {
        scd.innerHTML = scdStart;
    }

    mnt.innerHTML ='0' + mntStart;
    if (mntStart > 9) {
        mnt.innerHTML = mntStart;
    }
}

mainBtn.addEventListener('click', function() {
    btnsSettings.classList.add('btns-setting-show');

    switch(stopwatch.dataset.state) {
        case 'initial':
            mainBtn.innerHTML = 'Stop';
            stopwatch.dataset.state = 'running';
            timer = setInterval(watch, 10);
            break;

        case 'running':
            clearInterval(timer);
            mainBtn.innerHTML = 'Run';
            stopwatch.dataset.state = 'stopped';
            break;

        case 'stopped':
            mainBtn.innerHTML = 'Stop';
            stopwatch.dataset.state = 'running';
            timer = setInterval(watch, 10);
            break;
    }
});

var resetBtn = document.getElementById('btn-reset');

resetBtn.addEventListener('click', function() {
    btnsSettings.classList.remove('btns-setting-show');
    clearInterval(timer);
    ms.innerHTML ='00';
    scd.innerHTML ='00';
    mnt.innerHTML ='00';
    msStart = 0;
    scdStart = 0;
    mntStart = 0;
    result.innerHTML = '';
    mainBtn.innerHTML = 'Start';
    stopwatch.dataset.state = 'initial';
});

var saveBtn = document.getElementById('btn-save'),
    result = document.getElementsByClassName('result')[0];

saveBtn.addEventListener('click', function() {
    var a = result.children,
        saveNumber = a.length + 1,
        newParagraph = document.createElement('p');

    newParagraph.innerHTML = saveNumber + ') ' + mnt.innerHTML + ' : ' + scd.innerHTML + ' : ' + ms.innerHTML;
    result.appendChild(newParagraph);
});

