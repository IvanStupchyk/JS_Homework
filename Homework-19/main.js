const mainBtn = document.getElementById('main-btn'),
    btnsSettings = document.getElementsByClassName('btns-setting')[0],
    mnt = document.getElementsByClassName('minutes')[0],
    scd = document.getElementsByClassName('seconds')[0],
    ms = document.getElementsByClassName('milliseconds')[0],
    stopwatch = document.getElementsByClassName('watch')[0],
    body = document.getElementsByTagName('body')[0],
    result = document.getElementsByClassName('result')[0],
    resetBtn = document.getElementById('btn-reset'),
    saveBtn = document.getElementById('btn-save');


let timer;

let msStart = 0,
    scdStart = 0,
    mntStart = 0;

body.onunload = () => {
    localStorage.setItem('msStart', ms.innerHTML); 
    localStorage.setItem('scdStart', scd.innerHTML); 
    localStorage.setItem('mntStart', mnt.innerHTML); 

    localStorage.setItem('dataState', stopwatch.dataset.state);
    localStorage.setItem('result', result.innerHTML);
};

body.onload = () => {
    if (!localStorage.getItem('msStart')) {
        ms.innerHTML = '00';
        scd.innerHTML = '00';
        mnt.innerHTML = '00';
    }
    else {
        ms.innerHTML = localStorage.getItem('msStart');
        scd.innerHTML = localStorage.getItem('scdStart');
        mnt.innerHTML = localStorage.getItem('mntStart');
    }

    if (!localStorage.getItem('dataState')) {
        stopwatch.dataset.state = 'initial';
    }
    else {
        stopwatch.dataset.state = localStorage.getItem('dataState');
    }

    msStart = +localStorage.getItem('msStart');
    scdStart = +localStorage.getItem('scdStart');
    mntStart = +localStorage.getItem('mntStart');

    switch(stopwatch.dataset.state) {
        case 'running':
            timer = setInterval(watch, 10);
            mainBtn.innerHTML = 'Stop';
            btnsSettings.classList.add('btns-setting-show');
            break;

        case 'stopped':        
            clearInterval(timer);
            mainBtn.innerHTML = 'Run';
            btnsSettings.classList.add('btns-setting-show');
            break;
    }
    result.innerHTML = localStorage.getItem('result');
};

const appearance = (displayArea, value) => {
    displayArea.innerHTML ='0' + value;

    if (value > 9) {
        displayArea.innerHTML = value;
    }
}

const watch = () => {
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
        saveBtn.remove();
        mainBtn.remove();
        msStart = 0;
    }

    appearance(ms, msStart);
    appearance(scd, scdStart);
    appearance(mnt, mntStart);
}

mainBtn.addEventListener('click', () => {
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

resetBtn.addEventListener('click', () => {
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

saveBtn.addEventListener('click', () => {
    let a = result.children,
        saveNumber = a.length + 1,
        newParagraph = document.createElement('p');

    newParagraph.innerHTML = `${saveNumber}) ${mnt.innerHTML} : ${scd.innerHTML} : ${ms.innerHTML}`;
    result.appendChild(newParagraph);
});



