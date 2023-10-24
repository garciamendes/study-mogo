import { withAuth } from '@/hooks/withAuth'
import { useCreateTaskMutation, useListTasksQuery } from '@/store/modules/tasks/api'
import styles from '@/pages/home/styles.module.scss'
import { useState } from 'react'

const Home = () => {
  const [task, setTask] = useState('')
  const { data } = useListTasksQuery()
  const [createTask, { isLoading }] = useCreateTaskMutation()


  const handleCreateTask = () => {
    createTask({
      title: task,
      description: '',
      isFinished: false
    }).unwrap().finally(() => setTask(''))
  }

  const renderList = () => {
    if (!data?.tasks.length) {
      return <span>Nenhum item encontrado</span>
    }

    return (
      <ul>
        {data?.tasks.map((item) => {
          return <li key={item.id}>{item.title}</li>
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