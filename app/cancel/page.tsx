// app/cancel/page.tsx
import HomeButton from '@/components/HomeButton';
export default function CancelPage() {
  return (
    <div>
      <h1>Payment Canceled</h1>
      <p>Your payment was not completed. Feel free to try again later.</p>
      <HomeButton />
    </div>
  );
}
