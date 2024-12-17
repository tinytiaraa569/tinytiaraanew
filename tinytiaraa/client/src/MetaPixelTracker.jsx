import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MetaPixelTracker = () => {
  const location = useLocation();

  // Function to trigger Facebook Pixel events
  const trackEvent = (eventName, params = {}) => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', eventName, params);
    }
  };

  // List of routes to disallow tracking
  const disallowedRoutes = ['/dashboard', '/dashboard-create-product', '/dashboard-products','/catalog','/dashboard-events','/dashboard-coupons','/dashboard-orders','/dashboard-refunds','/dashboard-referral','/dashboard-Contactus'];

  // Effect hook that runs whenever the route changes
  useEffect(() => {
    // Regular expression to match product page URL with dynamic product name
    const productPageRegex = /^\/product\/(.+)$/;

    // Check if the current route is disallowed
    if (disallowedRoutes.includes(location.pathname)) {
      console.log('Tracking disallowed for path:', location.pathname);
      return; // Exit early, no tracking for disallowed routes
    }

    switch (location.pathname) {
      case '/':
        trackEvent('PageView'); // Home page event
        console.log('Home page');
        break;
      case '/about':
        trackEvent('ViewContent'); // About page event
        console.log('About page');
        break;
      case '/products':
        trackEvent('Shop'); // Shop page event
        console.log('Shop page');
        break;
      case '/personalised-prosperity':
        trackEvent('CustomizeProduct'); // Customize Product page event
        console.log('Personalised Prosperity page');
        break;
      case '/cart':
        trackEvent('AddToCart'); // Cart page event
        console.log('Cart page');
        break;
      case '/checkout-page':
        trackEvent('InitiateCheckout'); // Checkout page event
        console.log('Checkout page');
        break;
      case '/payment':
        trackEvent('AddPaymentInfo'); // Payment page event
        console.log('Payment page');
        break;
      case '/order/success':
        trackEvent('Purchase'); // Order success event
        console.log('Order success');
        break;
      case '/sign-up':
        trackEvent('CompleteRegistration'); // Sign-up page event
        console.log('Sign-up page');
        break;
      case '/login':
        trackEvent('CompleteRegistration'); // Login page event
        console.log('Login page');
        break;
      case '/contacts':
        trackEvent('Contact'); // Contact page event
        console.log('Contact page');
        break;
      case '/spinandwin':
        trackEvent('spinandwin'); // Spin and win page event
        console.log('Spin and win');
        break;
    case '/referrals':
        trackEvent('refer'); // Referral page event
        console.log('Referrals page');
        break;
    
      default:
        // Check if the current path matches a product page
        const productMatch = location.pathname.match(productPageRegex);
        if (productMatch) {
          const productName = productMatch[1]; // Extract the dynamic product name from URL
          trackEvent('ViewContent', { productName }); // Track event for the specific product
          console.log('Product page:', productName);
        } else {
          // Track the event for unmatched paths if they are not disallowed
          trackEvent('ViewContent', { path: location.pathname });
          console.log('Unmatched path:', location.pathname);
        }
        break;
    }
  }, [location]); // Trigger on route change

  return null; // This component doesn't render anything visible
};

export default MetaPixelTracker;
