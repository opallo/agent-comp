import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

const Header: React.FC = () => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: 20 }}>
      <h1>🎈 SaaS App 🎈</h1>
      <SignedIn>
        <UserButton
          showName={false}
          userProfileMode="modal"
          afterSwitchSessionUrl="/"
        />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </header>
  );
};

export default Header;
