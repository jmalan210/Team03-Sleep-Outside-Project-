
const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices{
  constructor() {
    this.baseURL = baseURL;
    
  }
  async getData(category) { 
    const response = await fetch(`${baseURL}products/search/${category}`);//
    const data = await convertToJson(response);
    //console.log(data.Result);
    return data.Result;
  }
  
  async findProductById(id) {
    
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result; 
  }

  async checkout(orderData) {
    const response = await fetch(`${baseURL}checkout`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(orderData)
    });
    const data = await convertToJson(response);
    return data;
  }
}//end of class definition

