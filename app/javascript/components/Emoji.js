import React from 'react'
import classNames from 'classnames'
import constants from 'lib/utils/constants'
import './Emoji.scss'

const Emoji = ({ name, badge, own, selected, onAdd, onRemove }) => {
  const handleClick = React.useCallback(() => {
    if (selected && own) {
      onRemove(selected)
    } else {
      onAdd({ kind: 'emoji', name })
    }
  }, [])

  return (
    <div className={classNames('emoji-chip', { 'selected': !!selected, 'own': own, [name.replace(/_/g, '-')]: true })} onClick={handleClick}>
      <span>{constants.emojiList[name]}</span>
      {(badge || 0) > 1 && <span>{badge}</span>}
    </div>
  )
}

export default Emoji
