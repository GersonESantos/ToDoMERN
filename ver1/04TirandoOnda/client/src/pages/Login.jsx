import React from "react";

const Login = () => {
  return (
    <section>
      <div class="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
        <img
          class="size-12 shrink-0"
          src="../../public/Gersonfb2025.png"
          alt="Gerson Eustaquio Dos Santos Logo"
        />
        <div>
          <div class="text-xl font-medium text-black dark:text-white">
            Gerson Eustaquio Dos Santos
          </div>
          <p class="text-gray-500 dark:text-gray-400">
            You have a new message!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
