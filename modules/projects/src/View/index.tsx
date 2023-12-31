import { useModule } from '@library/app';

import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import styles from './default.module.scss';
import { ErrorBoundary } from 'react-error-boundary';

export const ProjectsView = observer(() => {
  const { controller } = useModule();

  React.useEffect(() => {
    controller.getData();
  }, []);

  return (
    <ErrorBoundary FallbackComponent={() => <p>module error</p>}>
      <div>
        <p>Projects page</p>
        <div className={styles.list}>
          {controller.users.map((user: any) => {
            return (
              <Link key={user.uuid} className={styles.item} to={process.env.PUBLIC_URL + '/products/' + user.uuid}>
                <p>{user.name}</p>
              </Link>
            );
          })}
        </div>
        <Link to={process.env.PUBLIC_URL + '/'}>На домашнюю</Link>
      </div>
    </ErrorBoundary>
  );
});
