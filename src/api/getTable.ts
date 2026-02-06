import request from '@/api/index.ts';

export const getStudentList = async (params: any) :Promise<any> => {
  return await request.get('/getStudent', {
    params: params,
  });
};
export const deleteStudent = async (params: any) :Promise<any> => {
  return await request.post('/deleteStudent', params);
};
export const getComponentList = async (params?: any) :Promise<any> => {
  return await request.get('getApi', {
    params: params,
  });
};
export const deleteComponentList = async (params: any) :Promise<any> => {
  return await request.post('/deleteApi', params);
};
export const addComponentList = async (params: any) :Promise<any> => {
  return await request.post('/addApi', params);
};
export const getRoute = async () => {
  return await request.get('/getComponentRoutes');
};
export const addRouteList = async (params: any):Promise<any> => {
  return await request.post('/addComponentRoute', params);
};
