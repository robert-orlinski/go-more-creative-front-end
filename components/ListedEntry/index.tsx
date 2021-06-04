import { FC } from 'react';
import classNames from 'classnames';

import styles from './ListedEntry.module.scss';

import { ListedEntryType } from '../../types/global';
import { ClassicButton } from '../Button/Classic';

export const ListedEntry: FC<ListedEntryType> = ({ _id, topic, ideas, i }) => {
  const visibleIndex = `0${++i}.`;

  return (
    <details className={styles.entry}>
      <summary className={classNames('cursorPointer', styles.title)}>
        <span className={styles.indexContainer}>
          <span className={styles.index}>{visibleIndex}</span>
        </span>
        <span className="highlight">{topic}</span>
      </summary>
      <article>
        <ol className={styles.list}>
          {ideas.map(([ideaId, idea]) => (
            <li className={styles.listItem} key={`${_id}-${ideaId}`}>
              {idea}
            </li>
          ))}
        </ol>
        <ClassicButton>delete entry</ClassicButton>
      </article>
    </details>
  );
};
