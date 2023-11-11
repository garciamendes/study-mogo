import { withAuth } from '@/hooks/withAuth'
import { useCreateTaskMutation, useListTasksQuery } from '@/store/modules/tasks/api'
import styles from '@/pages/home/styles.module.scss'
import { useEffect, useState } from 'react'
import { googleAnalyticsEvent } from '@/utils'
import { Check, PencilSimpleLine, Trash, X } from '@phosphor-icons/react'
import { ITask } from '@/store/modules/tasks/types'
import { isMetaProperty, isPropertyAccessOrQualifiedName } from 'typescript'

const Home = () => {
  const [task, setTask] = useState('')
  const [taskToUpdate, setTaskToUpdate] = useState('')
  const [listTask, setListTask] = useState<ITask[]>([])
  const [isEditTask, setIsEditTask] = useState<{ edited: boolean, task_id: string | null }>({ edited: false, task_id: null })
  const { data, isLoading: isLoadingTaskList, isError } = useListTasksQuery()
  const [createTask, { isLoading }] = useCreateTaskMutation()

  useEffect(() => {
    if (!isLoadingTaskList && isError) return alert('Error list tasks')

    if (!isLoadingTaskList)
      setListTask(data?.tasks as ITask[])
  }, [isLoadingTaskList, isError, data?.tasks.length])

  const handleCreateTask = () => {
    googleAnalyticsEvent({
      action: 'createTask',
      params: {
        'createTask': task
      }
    })


    createTask({
      title: task,
      description: '',
      isFinished: false
    }).unwrap().finally(() => setTask(''))
  }

  const handleDeleteTask = (task: ITask) => {
    googleAnalyticsEvent({
      action: 'deleteTask',
      params: {
        'deleteTask': `${task.id} - ${task.title}`
      }
    })

    console.log('task deleted: ', task) // TODO: Send id task

    const newArray = listTask.filter(row => row.id !== task.id)
    setListTask(newArray)
  }

  const handleEditTask = (taskProps: ITask) => {
    googleAnalyticsEvent({
      action: 'editTask',
      params: {
        'editTask': `${taskProps.id} - ${taskProps.title}`,
        'editedTask': `${taskProps.id} - ${taskToUpdate}`
      }
    })


    let taskFinned = listTask.find(row => row.id !== taskProps.id)
    const taskCopyToEditFake: ITask = {
      title: taskToUpdate,
      userId: taskFinned?.userId as string,
      created: taskFinned?.created,
      description: taskFinned?.description,
      id: taskFinned?.id,
      isFinished: taskFinned?.isFinished,
      modified: String(new Date())
    }

    const newArray = listTask.filter(row => row.id !== taskProps.id)
    setListTask([...newArray, taskCopyToEditFake])
    setIsEditTask({ edited: false, task_id: null })
  }

  const renderList = () => {
    if (!listTask.length) {
      return <span>Nenhum item encontrado</span>
    }

    if (isLoadingTaskList)
      return <span style={{ textAlign: 'center' }}>Carregando...</span>

    return (
      <ul>
        {listTask.map((item, index) => {
          return (
            <div key={index} className={styles.containerListTask}>
              {(isEditTask.edited && (isEditTask.task_id === item.id)) ?
                <input type="text" onChange={e => setTaskToUpdate(e.target.value)} value={taskToUpdate} />
                : <li key={item.id}>{item.title}</li>}

              <Trash onClick={() => handleDeleteTask(item)} size={20} />
              {(isEditTask.edited && (isEditTask.task_id === item.id)) ?
                <div style={{ display: 'flex', gap: 10 }}>
                  <Check onClick={() => handleEditTask(item)} size={20} />
                  <X onClick={() => setIsEditTask({ edited: false, task_id: null })} size={20} />
                </div>
              : <PencilSimpleLine size={20} onClick={() => setIsEditTask({ edited: true, task_id: item.id as string })} />}
            </div>
          )
        })}
      </ul>
    )
  }

  return (
    <div className={styles.containerMain}>
      <section>
        <div>
          <input type="text" onChange={e => setTask(e.target.value)} value={task} />
          <button onClick={handleCreateTask}>{isLoading ? 'carregando...' : 'adicionar'}</button>
        </div>

        {renderList()}
      </section>
    </div>
  )
}

export default withAuth(Home)