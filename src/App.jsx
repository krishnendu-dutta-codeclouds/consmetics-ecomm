import { Provider } from 'react-redux';
import { store } from './redux/store';
import { GlobalStyles } from './assets/styles/globalStyles';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CartSidebar from './components/cart/CartSidebar';

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Router>
        <Header />
        <main>
          <AppRoutes />
        </main>
        <Footer />
        <CartSidebar />
      </Router>
    </Provider>
  );
};

export default App;