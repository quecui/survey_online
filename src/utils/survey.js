export function addNumber(componentArr, pageIndex) {
    const data = {
        type: 9,
        component: {
            question: 'Which number do you like ?'
        },
        required: 'none'
    }

    componentArr[pageIndex].data.push(data)
    return componentArr
}

export function addMatrix(componentArr, pageIndex) {
    const data = {
        type: 8,
        component: {
            question: 'Which color do you like ?'
        },
        required: 'none'
    }

    componentArr[pageIndex].data.push(data)
    return componentArr
}

export function addComment(componentArr, pageIndex) {
    const data = {
        type: 7,
        component: {
            question: 'Which color do you like ?'
        },
        required: 'none'
    }

    componentArr[pageIndex].data.push(data)
    return componentArr
}

export function addDropbox(componentArr, pageIndex) {
    const data = {
        type: 6,
        component: {
            question: 'Which color do you like ?',
            options: ['yellow', 'red', 'grey']
        },
        required: 'none'
    }

    componentArr[pageIndex].data.push(data)
    return componentArr
}

export function addCheckbox(componentArr, pageIndex) {
    const data = {
        type: 5,
        component: {
            question: 'Which color do you like ?',
            options: ['yellow', 'red', 'grey']
        },
        required: 'none'
    }

    componentArr[pageIndex].data.push(data)
    return componentArr
}

export function addEmail(componentArr, pageIndex) {
    const data = {
        type: 4,
        component: {
            question: 'What is your email ?'
        },
        required: 'string'
    }

    componentArr[pageIndex].data.push(data)
    return componentArr
}

export function addColor(componentArr, pageIndex) {
    const data = {
        type: 3,
        component: {
            question: 'Which color do you like ?'
        },
        required: 'string'
    }

    componentArr[pageIndex].data.push(data)
    return componentArr
}

export function addSingleText(componentArr, pageIndex) {
    const data = {
        type: 1,
        component: {
            question: 'What is your name?'
        },
        required: 'string'
    }

    componentArr[pageIndex].data.push(data)
    return componentArr
}

export function addBirthdate(componentArr, pageIndex) {
    const data = {
        type: 2,
        component: {
            question: 'When was you born ?'
        },
        required: 'string'
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

