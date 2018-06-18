export function addNumber(componentArr, pageIndex) {
    const data = {
        type: 9,
        name: 'Number',
        component: {
            question: 'Which number do you like ?',
            answer: ''
        },
        required: false
    }

    componentArr[pageIndex].data.push(data)
    return componentArr
}

export function addMatrix(componentArr, pageIndex) {
    const data = {
        type: 8,
        name: 'Matrix',
        component: {
            question: 'Which color do you like ?',
            rowOptions: ['car', 'mobile'],
            colOptions: ['hard', 'grass'],
            numberChange: 0,
            answer: ''
        },
        required: false
    }

    componentArr[pageIndex].data.push(data)
    return componentArr
}

export function addComment(componentArr, pageIndex) {
    const data = {
        type: 7,
        name: 'Commnent',
        component: {
            question: 'Which color do you like ?',
            answer: ''
        },
        required: false
    }

    componentArr[pageIndex].data.push(data)
    return componentArr
}

export function addDropbox(componentArr, pageIndex) {
    const data = {
        type: 6,
        name: 'Dropbox',
        component: {
            question: 'Which color do you like ?',
            options: ['yellow', 'red', 'grey'],
            numberChange: 0,
            answer: ''
        },
        required: false
    }

    componentArr[pageIndex].data.push(data)
    return componentArr
}

export function addCheckbox(componentArr, pageIndex) {
    const data = {
        type: 5,
        name: 'Checkbox',
        component: {
            question: 'Which color do you like ?',
            options: ['yellow', 'red', 'grey'],
            numberChange: 0,
            answer: [],
            checked: []
        },
        required: false
    }

    componentArr[pageIndex].data.push(data)
    return componentArr
}

export function addEmail(componentArr, pageIndex) {
    const data = {
        type: 4,
        name: 'Email',
        component: {
            question: 'What is your email ?',
            answer: ''
        },
        required: false
    }

    componentArr[pageIndex].data.push(data)
    return componentArr
}

export function addColor(componentArr, pageIndex) {
    const data = {
        type: 3,
        name: 'Color',
        component: {
            question: 'Which color do you like ?',
            answer: ''
        },
        required: false
    }

    componentArr[pageIndex].data.push(data)
    return componentArr
}

export function addSingleText(componentArr, pageIndex) {
    const data = {
        type: 1,
        name: 'SingleText',
        component: {
            question: 'What is your name?',
            answer: ''
        },
        required: false
    }

    componentArr[pageIndex].data.push(data)
    return componentArr
}

export function addBirthdate(componentArr, pageIndex) {
    const data = {
        type: 2,
        name: 'Birthdate',
        component: {
            question: 'When was you born ?',
            answer: ''
        },
        required: false
    }

    componentArr[pageIndex].data.push(data)
    return componentArr
}

export function addComponent(key, componentArr, pageIndex){
    switch (key){
        case 1:
            return addSingleText(componentArr, pageIndex)
        case 2:
            return addBirthdate(componentArr, pageIndex)
        case 3:
            return addColor(componentArr, pageIndex)
        case 4:
            return addEmail(componentArr, pageIndex)
        case 5:
            return addCheckbox(componentArr, pageIndex)
        case 6:
            return addDropbox(componentArr, pageIndex)
        case 7:
            return addComment(componentArr, pageIndex)
        case 8:
            return addMatrix(componentArr, pageIndex)
        case 9:
            return addNumber(componentArr, pageIndex)
        default:
            console.log('No matched')
    }

    return componentArr
}

export function setTimeTarget(rootTime) {
    const convertTime = new Date(Date.parse(rootTime))
    let month = 0

    if(convertTime.getMonth() + 1 > 9){
        month = convertTime.getMonth() + 1
    } else {
        month = '0' + (convertTime.getMonth() + 1)
    }

    return convertTime.getFullYear() + '-' + month + '-' + convertTime.getDate()
}

export function convertPageToString(pages) {
    const tmp = []
    pages.map(page => {
        tmp.push({data: JSON.stringify(page.data)})
    })

    return tmp
}

export function convertPageFromString(pages) {
    const tmp = []
    pages.map(page => {
        tmp.push({data: JSON.parse(page.data)})
    })

    return tmp
}
