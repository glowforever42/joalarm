/**
 * @author Hanseunghun
 */

import { axiosInstance } from './axiosInstance';

export type SlidesProps = {
  emojiUrl: string;
};

interface IReadEmojiReqData {
  emojiUrl: string;
}

export interface IReadEmojiResponse {
  data: Array<SlidesProps>;
}

interface IReadEmojiUserReqData {
  userId: number;
}

interface IUpdateEmojiReqData {
  emojiUrl: SlidesProps;
}

const updateEmojiAPI = async (data: IUpdateEmojiReqData, token: string) => {
  const response = await axiosInstance.post(
    'accounts/emoji',
    JSON.stringify(data),
    { headers: { token: `Bearer ${token}` } },
  );
  return response;
};

const readEmojiUserAPI = async (data: IReadEmojiUserReqData) => {
  const response = await axiosInstance.get(`accounts/${data.userId}/emoji`);
  return response.data;
};

const readEmojiAPI = async (
  data: IReadEmojiReqData,
): Promise<IReadEmojiResponse> => {
  const response = await axiosInstance.post('/emojis', JSON.stringify(data));
  return response.data;
};

export { readEmojiAPI, updateEmojiAPI, readEmojiUserAPI };
