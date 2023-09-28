import z from 'zod';

export default z.object({
  name: z.string().min(3).max(30),
  password: z.string().min(8).max(30),
});
