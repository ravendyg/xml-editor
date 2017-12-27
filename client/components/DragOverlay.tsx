import * as React from 'react';

export class DragOverlay extends React.PureComponent<{}, {}> {
    render() {
        return(
            <div className="drag-overlay" onMouseEnter={() => console.log('enter')}>
            </div>
        );
    }
}
