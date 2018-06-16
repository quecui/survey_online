
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
        default:
            console.log('No matched')
    }

    return componentArr
}

