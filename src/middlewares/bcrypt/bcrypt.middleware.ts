import * as bcrypt from 'bcrypt';

export const hashFunc = async (data: string): Promise<string> => {
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(data, saltOrRounds);
  return hash;
};

export const generateFunc = async (
  dataInput: string,
  dataStore: string,
): Promise<boolean> => {
  console.log({ data: dataInput, store: dataStore });
  const isMatch = await bcrypt.compare(dataInput, dataStore);
  return isMatch;
};
