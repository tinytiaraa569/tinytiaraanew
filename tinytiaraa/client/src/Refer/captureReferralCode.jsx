export const captureReferralCode = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const referralCode = queryParams.get('referral'); // Adjust to match the URL parameter
    if (referralCode) {
        console.log('Captured referral code:', referralCode); // Debugging line
        sessionStorage.setItem('referralCode', referralCode);
    } else {
        console.log('No referral code in URL'); // Debugging line
    }
};