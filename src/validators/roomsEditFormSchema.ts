import { z } from 'zod';

const MAX_FILE_SIZE = 3000000; // 3MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];

const roomsEditFormSchema = z
  .object({
    name: z.string().min(1).max(10).optional(),
    maxCapacity: z.number().min(1),
    regularPrice: z.number().min(1),
    discount: z.number().min(0).optional(),
    description: z.string().min(8),
    image: z
      .any()
      .refine((file) => {
        if (file.length > 0) {
          return file[0]?.size <= MAX_FILE_SIZE;
        }
        return true;
      }, 'Max image size is 3MB.')
      .refine((file) => {
        if (file.length > 0) {
          return ACCEPTED_IMAGE_TYPES.includes(file[0]?.type);
        }
        return true;
      }, 'Only .jpg, .jpeg, .png and .webp formats are supported.'),
  })
  .refine((data) => data.regularPrice > data.discount, {
    message: 'Discount should be lesser than regular price',
    path: ['discount'],
  });

export default roomsEditFormSchema;
