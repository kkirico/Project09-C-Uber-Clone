import { Driver } from '../models';

export default {
  create: async (payload) => {
    return await Driver.create(payload);
  },
  findAll: async () => {
    return await Driver.find({});
  },
  findByEmail: async (payload: {email: string}) => {
    return await Driver.findOne({ email: payload.email });
  },
  findAllByDistance: async({ lat, lng }:{lat:number, lng:number}) => {
    const latitude = { $gte: lat - 0.03, $lte: lat + 0.03 };
    const longitude = { $gte: lng - 0.03, $lte: lng + 0.03 };
    return await Driver.find({ latitude, longitude }, '_id');
  },
  findById: async (payload: {id: string}) => {
    return await Driver.findById(payload.id);
  },
};
