import { FormEvent } from 'react';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> { }

export default function Form({ children, onSubmit, ...props }: FormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) onSubmit(event);
  };

  return (
    <form onSubmit={handleSubmit} { ...props }>{children}</form>
  );
}
