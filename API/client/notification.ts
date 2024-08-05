export const addTimer = async (fcmToken: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTNAME}/api/send-notification`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: fcmToken,
        title: "Test Notification",
        message: "This is a test notification",
        link: "/account",
      }),
    }
  );

  const data = await response.json();
};
