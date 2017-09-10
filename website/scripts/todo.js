/**
 * Created by naamaa on 27/01/2016.
 */

(function () {

    var Todo = (function () {

        var counter = 0,
            priorityTypes = {
                High: 0,
                Medium: 1,
                Low: 2,
                None: 3
            },
            sortTypes = {
                DATE: 0,
                PRIORITY: 1
            };

        var itemTemplate = createTemplateById('item-template');
        var listsTemplate = createTemplateById('lists-template');

        function createTemplateById(id) {
            var source = document.querySelector('#' + id).innerHTML;
            return Handlebars.compile(source);
        }

        Handlebars.registerHelper('list_creator', function () {
            return itemTemplate(getItemContextForTemplate(this));
        });

        function getItemContextForTemplate(item) {
            var priority = (item.priority === priorityTypes.None) ? 'hidden' : 'item-priority-' + getKeyByValue(priorityTypes, Number(item.priority)).toLowerCase();

            return {
                checked: item.isDone ? 'checked' : '',
                priority: {
                    name: getKeyByValue(priorityTypes, Number(item.priority)),
                    className: priority
                },
                title: item.title,
                doneClass: item.isDone ? 'done-item' : ''
            };
        }

        function getKeyByValue(obj, value) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    if (obj[prop] === value)
                        return prop;
                }
            }
        }

        function createItemObj(newTitle) {
            return {
                title: newTitle,
                description: '',
                priority: priorityTypes.None,
                id: 'item-' + guid(),
                isDone: false,
                subTasks: []
            };
        }

        function sortArrByType(origArr, type) {
            var arr = origArr.slice(0);
            if (type === sortTypes.DATE) {
                arr.sort(function (a, b) {
                    return a.id - b.id;
                });
            }
            else if (type == sortTypes.PRIORITY) {
                arr.sort(function (a, b) {
                    return a.priority - b.priority;
                });
            }
            return arr;
        }

        function isDoneItemsExist(arr) {
            if (arr != null) {
                return arr.some(function (elem) {
                    return elem.isDone;
                });
            }
        }

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        return {

            init: function (data, containerID, isSubTask) {

                var items = data;
                var container = document.querySelector('#' + containerID);
                renderListsWithItems(items);

                if (!isSubTask) {
                    //init sort select
                    var select = document.querySelector("#todoSorting");
                    select.addEventListener('change', function (event) {
                        sort(event.target.value);
                    });

                    //init more info events
                    attachEventListenersToItemExtraInfo();

                    addSubscriptions();
                }

                function renderListsWithItems(items) {
                    //init lists
                    container.innerHTML = listsTemplate({
                        items: items,
                        hiddenClass : isDoneItemsExist(items) ? '' : 'hidden'
                    });

                    //init new item input
                    attachEventListenersToItemPlaceholder();

                    //init new items
                    items.forEach(function (elem) {
                        attachEventListenersToNewItem(elem.id);
                    });
                }

                function saveItemsToLocalStorage(){
                    if (!isSubTask) {
                        window.localStorage.setItem('items', JSON.stringify(items));
                    }
                }

                function addSubscriptions() {
                    //list/title-update
                    pubsub.subscribe('list/title-update', function (topic, args) {
                        //update more info
                        var title = document.querySelector('#itemInfoTitle');
                        title.value = args.title;
                    });

                    //extraInfo/title-update
                    pubsub.subscribe('extraInfo/title-update', function (topic, args) {
                        //update more info
                        var input = document.querySelector('#' + args.id + " input[type=text]");
                        input.value = args.title;
                    });

                    //item click
                    pubsub.subscribe('item-click', function (topic, args) {
                        //init item info area
                        var itemInfo = document.querySelector('#itemInfo');
                        itemInfo.setAttribute('data-item-id', args.item.id);
                        itemInfo.classList.remove('hidden');

                        //update more info fields with item data
                        var title = document.querySelector('#itemInfoTitle');
                        title.value = args.item.title;

                        var priority = document.querySelector('#todoPriority');
                        priority.value = args.item.priority;

                        var description = document.querySelector('#itemInfoDesc');
                        description.value = args.item.description;

                        Todo.init(args.item.subTasks, 'subTasks', true);

                    });

                    //priority-change
                    pubsub.subscribe('priority-change', function (topic, args) {
                        //update priority label
                        var span = document.querySelector('#' + args.id + ' .item-priority');
                        var priorityText = getKeyByValue(priorityTypes, args.priority);
                        span.innerHTML = priorityText;
                        span.className = "item-priority";
                        if (args.priority == priorityTypes.None) {
                            span.classList.add('hidden');
                        } else {
                            span.classList.add('item-priority-' + priorityText.toLowerCase());
                        }
                    });

                    pubsub.subscribe('item-update', function (topic, args) {
                        saveItemsToLocalStorage();
                    });
                }

                function renderItem(item, tempInput) {

                    //create li
                    var li = document.createElement('li');
                    li.id = item.id;
                    li.classList.add('todo-item');
                    var context = getItemContextForTemplate(item);
                    li.innerHTML = itemTemplate(context);

                    //add to ul
                    var list;
                    if (item.isDone) {
                        list = container.querySelector('ul[data-id=doneItems]');
                        list.appendChild(li);
                    }
                    else {
                        list = container.querySelector('ul[data-id=activeItems]');
                        list.insertBefore(li, tempInput.parentNode);
                    }

                    //attach events to li elements
                    var inputText = attachEventListenersToNewItem(item.id);

                    inputText.value = item.title;
                    return inputText;
                }

                function attachEventListenersToNewItem(id) {

                    //input text
                    var inputText = container.querySelector('#' + id + ' input[type=text]');
                    inputText.addEventListener("keyup", function (event) {
                        var itemTitle = event.target.value;

                        updateItem(event.target.parentNode.id, {
                            title: itemTitle
                        });

                        if (!isSubTask) {
                            pubsub.publish('list/title-update', {
                                title: itemTitle
                            });
                        }

                        //on Enter
                        if (event.keyCode === 13) {
                            //move to the next item
                            var sibling = event.target.parentNode.nextSibling;
                            if (sibling != undefined) {
                                var inputText = sibling.querySelector('input[type=text]');
                                inputText.focus();
                                inputText.click();
                            }
                        }
                    });
                    inputText.addEventListener("click", function (event) {
                        if (!isSubTask) {
                            var item = getItem(event.target.parentNode.id);
                            pubsub.publish('item-click', {
                                item: item
                            });
                        }
                    });

                    //checkbox
                    var checkbox = document.querySelector('#' + id + ' input[type=checkbox]');
                    checkbox.addEventListener("change", function (event) {
                        toggleItemStatus(event.target.parentNode.id);
                    });
                    checkbox.addEventListener("keyup", function (event) {
                        if (event.keyCode === 13) {
                            event.target.click();
                        }
                    });

                    //x button
                    var removeIcon = document.querySelector('#' + id + ' .fa-trash-o');
                    removeIcon.addEventListener("click", function (event) {
                        removeItem(event.target.parentNode.id);
                        pubsub.publish('item-remove');
                    });
                    removeIcon.addEventListener("keyup", function (event) {
                        if (event.keyCode === 13) {
                            event.target.click();
                        }
                    });

                    return inputText;
                }

                function attachEventListenersToItemPlaceholder() {
                    var itemPlaceholder = container.querySelector("li[data-id=newItem] input");
                    itemPlaceholder.addEventListener('input', function (event) {
                        addItem(event.target);
                    });
                    itemPlaceholder.addEventListener('click', function () {
                        var itemInfo = document.querySelector('#itemInfo');
                        if (!isSubTask) {
                            itemInfo.classList.add('hidden');
                        }
                    });
                    return itemPlaceholder;
                }

                function attachEventListenersToItemExtraInfo() {

                    //init title input
                    var title = document.querySelector('#itemInfoTitle');
                    title.addEventListener('input', function (event) {
                        var id = event.target.parentNode.getAttribute('data-item-id');
                        var title = event.target.value;
                        updateItem(id, {
                            title: title
                        });
                        if (!isSubTask) {
                            pubsub.publish('extraInfo/title-update', {
                                id: id,
                                title: title
                            });
                        }
                    });

                    //init priority select
                    var priority = document.querySelector('#todoPriority');
                    priority.addEventListener('change', function (event) {
                        var id = event.target.parentNode.getAttribute('data-item-id');
                        updateItem(id, {
                            priority: event.target.value
                        });

                        pubsub.publish('priority-change', {
                            id: id,
                            priority: Number(event.target.value)
                        });

                        //update sorting
                        var sorting = document.querySelector('#todoSorting').value;
                        if (Number(sorting) === sortTypes.PRIORITY) {
                            sort(sorting);
                        }
                    });

                    //init description text area
                    var description = document.querySelector('#itemInfoDesc');
                    description.addEventListener('input', function (event) {
                        var id = event.target.parentNode.getAttribute('data-item-id');
                        updateItem(id, {
                            description: event.target.value
                        });
                        pubsub.publish('desc-change', {
                            id: id,
                        });
                    });
                }

                function sort(type) {
                    var arr = sortArrByType(items, type);
                    renderListsWithItems(arr);
                }

                function getItem(id) {
                    return items.filter(function (obj) {
                        return obj.id === id;
                    })[0];
                }

                function addItem(tempInput) {
                    //create item
                    var item = createItemObj(tempInput.value);
                    items.push(item);

                    //paint item
                    var input = renderItem(item, tempInput);
                    //focus on the new created item
                    input.focus();
                    input.click();

                    //clear temp input
                    tempInput.value = "";

                    pubsub.publish('item-update');
                }

                function updateItem(id, obj) {
                    var item = getItem(id);

                    //update it's properties
                    for (var prop in obj) {
                        if (obj.hasOwnProperty(prop)) {
                            item[prop] = obj[prop];
                        }
                    }

                    pubsub.publish('item-update');
                }

                function removeItem(id) {
                    var item = getItem(id);

                    //remove from items arr
                    var itemIdx = items.indexOf(item);
                    items.splice(itemIdx, 1);

                    //remove from DOM
                    var li = document.querySelector('#' + item.id);
                    var list = item.isDone ? container.querySelector('ul[data-id=doneItems]') : container.querySelector('ul[data-id=activeItems]');
                    list.removeChild(li);

                    var itemInfo = document.querySelector('#itemInfo');
                    if (itemInfo.getAttribute('data-item-id') === id) {
                        itemInfo.classList.add('hidden');
                    }

                    pubsub.publish('item-update');
                }

                function toggleItemStatus(id) {
                    //update item obj
                    var item = getItem(id);
                    updateItem(id, {
                        isDone: !item.isDone
                    });

                    //update HTML
                    var li = document.querySelector('#' + item.id);
                    var input = document.querySelector('#' + item.id + ' input[type=text]');
                    var activeItems = container.querySelector('ul[data-id=activeItems]');
                    var doneItems = container.querySelector('ul[data-id=doneItems]');
                    var doneItemsArea = container.querySelector('section[data-id=doneItemsArea]');
                    if (item.isDone) {
                        //remove from active items
                        activeItems.removeChild(li);
                        //add to done items
                        doneItems.appendChild(li);

                        input.classList.add('done-item');
                        if (doneItemsArea.classList.contains('hidden')) {
                            doneItemsArea.classList.remove('hidden');
                        }
                    }
                    else {
                        //remove from done items
                        doneItems.removeChild(li);
                        //add to active items before the last li
                        var itemPlaceholder = document.querySelector("#newItem");
                        activeItems.insertBefore(li, itemPlaceholder);

                        input.classList.remove('done-item');
                        if (!isDoneItemsExist(items)) {
                            doneItemsArea.classList.add('hidden');
                        }
                    }

                    //update sorting
                    var sorting = document.querySelector('#todoSorting').value;
                    sort(sorting);
                }

                return {
                    sort: sort,
                    getItem: getItem,
                    addItem: addItem,
                    updateItem: updateItem,
                    removeItem: removeItem,
                    toggleItemStatus: toggleItemStatus
                }
            }
        }
    })();

    var items = JSON.parse(window.localStorage.getItem('items')) || [];
    Todo.init(items, 'mainTasks', false);
    //req('GET', 'http://jsonplaceholder.typicode.com/todos', getItems);

    function getItems(todos) {
        var arr = JSON.parse(todos).slice(0, 10);
        var items = arr.map(function (elem) {
            return {
                title: elem.title,
                description: '',
                priority: 3,
                id: 'ex' + elem.id,
                isDone: elem.completed,
                subTasks: []
            };
        });
        Todo.init(items, 'mainTasks', false);
    }

    function req(method, url, callback, progressCallback) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.onreadystatechange = function () {
            if (progressCallback) {
                progressCallback(xhr);
            }
            if (xhr.readyState == XMLHttpRequest.DONE) {
                callback(xhr.responseText);
            }
        };
        addJsonStubHeaders(xhr);
        xhr.send();
    }

    function addJsonStubHeaders(xhr) {
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://jsonstub.com');
        xhr.setRequestHeader('JsonStub-User-Key', '1ae16189-309a-4b53-84de-7ae7bd85bb7f');
        xhr.setRequestHeader('JsonStub-Project-Key', 'e3ea1297-5a15-49b7-be01-0b091fa28c1c');
        return xhr;
    }

})();


