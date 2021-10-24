import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Header, Container } from './base';
import PageRouter from './base/PageRouter';
import Sidebar from './base/Sidebar';
import RightClickMenu from './base/RightClickMenu';
import BrowsePage from './view/BrowsePage';
const styles =  require('./App.css') as any;

interface AppState {
}

class App extends Component<any, AppState> {
  
  constructor(props: any) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
        <div className={styles.app}>
          <Header title='FSE' />
          <Container>
            <Sidebar />
            <PageRouter>
              <BrowsePage />
            </PageRouter>
            <RightClickMenu />
          </Container>
        </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'));