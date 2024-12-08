import { SnackbarProvider } from 'notistack';
import { ExpenseProvider } from './context/ExpenseContext';
import { Header } from './components/Header/Header';
import { Main } from './components/Transaction/Transaction';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <ExpenseProvider>
        <div className="App">
          <Header />
          <Main />
        </div>
      </ExpenseProvider>
    </SnackbarProvider>
  );
}

export default App;
