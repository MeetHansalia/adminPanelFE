// Third-party Imports
import classnames from 'classnames'

// Style Imports
import styles from './styles.module.css'

const StepperCustomDot = props => {
  // Props
  const { active, completed, error } = props

  if (error) {
    return <i className='tabler-alert-triangle-filled text-xl scale-[1.2] text-error' />
  } else if (completed) {
    return (
      <div
        className={classnames(styles.stepperCustomDot, 'flex items-center justify-center', {
          [styles.completedStepperCustomDot]: completed
        })}
      >
        <i className='tabler-check text-sm text-white' />
      </div>
    )
  } else {
    return <div className={classnames(styles.stepperCustomDot, { [styles.activeStepperCustomDot]: active })} />
  }
}

export default StepperCustomDot
