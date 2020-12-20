var btnGetUsers = document.getElementsByTagName('button')[0],
    usersTabs = document.getElementsByClassName('tabs-users')[0],
    tabsBody = document.getElementsByClassName('tabs-body')[0],
    mainBlock = document.getElementsByClassName('main-block')[0],
    pageContent = document.getElementsByClassName('page-content')[0];

if (localStorage.getItem('usersData') == null) {

    btnGetUsers.addEventListener('click', function(event) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://reqres.in/api/users?page=2'); 
        xhr.send();

        xhr.onload = function() {
            var statusType = +String(this.status)[0];
    
            if (statusType === 2) {
                try {
                    // JSON.parse('Hello');
                    JSON.parse(this.response);
                } catch(error) {
                    var textError = document.createElement('div');
                    textError.innerHTML = 'An error occured while loading data';
                    textError.classList.add('data-error');
                    pageContent.replaceChild(textError, mainBlock);
                }
                
                var users = JSON.parse(this.response).data;
                mainBlock.classList.add('main-block-show');
                btnGetUsers.setAttribute('disabled', 'disabled');
                localStorage.setItem('usersData', JSON.stringify(users));

                for (var i = 0; i < users.length; i++) {
                    var numUser = i + 1;
                    usersTabs.innerHTML += '<a class="tabs-item">' + 'User ' + numUser + '</a>';
                }
                var firstTab = usersTabs.firstElementChild;
                firstTab.classList.add('active');

                tabsBody.innerHTML = '<img src="' + users[0].avatar + '">' + '<p>' + 
                'First Name: ' + users[0].first_name + '<br>' + 'Last Name: ' + users[0].last_name + '</p>'; 

                usersTabs.addEventListener('click', function(e) {
                    var target = e.target;

                    if (target.tagName == 'A') {
                        var tabs = this.querySelectorAll('a');

                        for (var i = 0; i < tabs.length; i++) {
                            tabs[i].classList.remove('active');
                        }
                        target.classList.add('active');

                        var numUser = target.textContent[5] - 1; 
                        tabsBody.innerHTML = '<img src="' + users[numUser].avatar + '">' + '<p>' + 
                        'First Name: ' + users[numUser].first_name + '<br>' + 'Last Name: ' + users[numUser].last_name + '</p>';
                    }
                })            
            }

            else {
                this.status;
            } 
        };
    });
}
else {
    var users = JSON.parse(localStorage.getItem('usersData'));
    mainBlock.classList.add('main-block-show');
    btnGetUsers.setAttribute('disabled', 'disabled');
    localStorage.setItem('usersData', JSON.stringify(users));

    for (var i = 0; i < users.length; i++) {
        var numUser = i + 1;
        usersTabs.innerHTML += '<a class="tabs-item">' + 'User ' + numUser + '</a>';
    }
    var firstTab = usersTabs.firstElementChild;
    firstTab.classList.add('active');

    tabsBody.innerHTML = '<img src="' + users[0].avatar + '">' + '<p>' + 
    'First Name: ' + users[0].first_name + '<br>' + 'Last Name: ' + users[0].last_name + '</p>'; 

    usersTabs.addEventListener('click', function(e) {
        var target = e.target;

        if (target.tagName == 'A') {
            var tabs = this.querySelectorAll('a');

            for (var i = 0; i < tabs.length; i++) {
                tabs[i].classList.remove('active');
            }
            target.classList.add('active');

            var numUser = target.textContent[5] - 1; 
            tabsBody.innerHTML = '<img src="' + users[numUser].avatar + '">' + '<p>' + 
            'First Name: ' + users[numUser].first_name + '<br>' + 'Last Name: ' + users[numUser].last_name + '</p>';
        }
    })           
}





