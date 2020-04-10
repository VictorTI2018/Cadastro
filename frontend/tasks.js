const API = 'http://localhost:3000'

const getTasks = () => {
    $.ajax({
        url: `${API}/tasks`,
        success: tasks => {
            renderRows(tasks)
            clearFields()
        }
    })
}

const saveTask = () => {
    const { _id, title, description } = getFields()

    if (title || description) {
        $.ajax({
            method: _id ? 'PUT' : 'POST',
            url: `${API}/tasks/${_id}`,
            data: _id ? {
                _id,
                title,
                description
            } :
                {
                    title,
                    description
                },
            success: getTasks
        })
    } else {
        alert("Por favor informe todos os dados")
    }
}

const removeTasks = task => {
    $.ajax({
        method: 'DELETE',
        url: `${API}/tasks/${task._id}`,
        success: getTasks
    })
}

const loadTask = task => {
    $('[name=id]').val(task._id)
    $('[name=title]').val(task.title)
    $('[name=description]').val(task.description)
}

const save = () => {
    $('[save]').click(saveTask)
}

const createButton = (label, type) => {
    return $('<button>').addClass(`btn btn-${type}`).html(label)
}

const renderRows = tasks => {
    const rows = tasks.map(task => {
        const updateButton = createButton('Editar', 'warning')
        updateButton.click(() => loadTask(task))
        const deleteButton = createButton('Excluir', 'danger')

        deleteButton.click(() => removeTasks(task))

        return $('<tr>')
            .append($('<td>').append(task._id))
            .append($('<td>').append(task.title))
            .append($('<td>').append(task.description))
            .append($('<td>').append(updateButton).append(deleteButton))
    })

    $('#tasksRows').html(rows)
}

const getFields = () => {
    const _id = $('[name=id]').val()
    const title = $('[name=title]').val()
    const description = $('[name=description]').val()
    return {
        _id, title, description
    }
}

const clearFields = () => {
    $('[name=title]').val('')
    $('[name=description]').val('')
}

$(() => {
    getTasks()
    save()
})