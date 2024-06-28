import React from "react";

export const Config = {
    baseURL: 'https://api.baserow.io/api/database',
    token:
      '',
};


export const buscar_usuario_Email = async (email_input) => {
  try {
    const response = await fetch(`${Config.baseURL}/rows/table/250385/?user_field_names=true&filter__field_1768091__boolean=true&search=${email_input}`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${Config.token}`
      }
      })
    const json = await response.json();
    //console.log(json.results)
    const status = response.status;
    return {success: true, data: json.results, status: status};
  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
};


export const buscar_destaques = async () => {
  try {
    const response = await fetch(`${Config.baseURL}/rows/table/248864/?user_field_names=true&filter__field_1755909__boolean=true`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${Config.token}`
      }
    })
    const json = await response.json();
    const status = response.status;

    return {success: true, data: json.results, status: status, count : json.count};

  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
};


export const buscar_Lancamentos = async () => {
  try {
    const response = await fetch(`${Config.baseURL}/rows/table/248859/?user_field_names=true&filter__field_1755894__boolean=true&order_by=-Lancamento&size=9`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${Config.token}`
      }
    })
    const json = await response.json();
    const status = response.status;

    return {success: true, data: json.results, status: status, count : json.count, next : json.next};

  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
};



export const buscar_populares = async () => {
  try {
    const response = await fetch(`${Config.baseURL}/rows/table/248859/?user_field_names=true&filter__field_1755894__boolean=true&order_by=-Visualizacoes&size=9`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${Config.token}`
      }
    })
    const json = await response.json();
    const status = response.status;

    return {success: true, data: json.results, status: status, count : json.count, next : json.next};

  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
};



export const buscar_filmes = async () => {
  try {
    const response = await fetch(`${Config.baseURL}/rows/table/248859/?user_field_names=true&filter__field_1755894__boolean=true&filter__field_1756070__contains=Filme&order_by=-Lancamento&size=9`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${Config.token}`
      }
    })
    const json = await response.json();
    const status = response.status;

    return {success: true, data: json.results, status: status, count : json.count, next : json.next};

  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
};


export const buscar_serie = async () => {
  try {
    const response = await fetch(`${Config.baseURL}/rows/table/248859/?user_field_names=true&filter__field_1755894__boolean=true&filter__field_1756070__contains=Serie&order_by=-Visualizacoes&size=9`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${Config.token}`
      }
    })
    const json = await response.json();
    const status = response.status;

    return {success: true, data: json.results, status: status, count : json.count, next : json.next};

  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
};



export const buscar_anime = async () => {
  try {
    const response = await fetch(`${Config.baseURL}/rows/table/248859/?user_field_names=true&filter__field_1755894__boolean=true&filter__field_1756070__contains=Anime&order_by=-Visualizacoes&size=9`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${Config.token}`
      }
    })
    const json = await response.json();
    const status = response.status;

    return {success: true, data: json.results, status: status, count : json.count, next : json.next};

  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
};



export const buscar_Infos = async (_i) => {
  try {
    const response = await fetch(`${Config.baseURL}/rows/table/248859/?user_field_names=true&filter__field_1755894__boolean=true&search=${_i}`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${Config.token}`
      }
    })
    const json = await response.json();
    const status = response.status;

    return {success: true, data: json.results, status: status, count : json.count};

  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
};



export const buscar_categorias = async () => {
  try {
    const response = await fetch(`${Config.baseURL}/rows/table/248877/?user_field_names=true&filter__field_1756004__boolean=true`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${Config.token}`
      }
    })
    const json = await response.json();
    const status = response.status;

    return {success: true, data: json.results, status: status, count : json.count};

  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
};


export const buscar_Titulos_explorar = async () => {
  try {
    const response = await fetch(`${Config.baseURL}/rows/table/248859/?user_field_names=true&filter__field_1755894__boolean=true&order_by=-Lancamento&size=24`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${Config.token}`
      }
    })
    const json = await response.json();
    const status = response.status;

    return {success: true, data: json.results, status: status, count : json.count};

  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
};



export const buscar_Favs = async (_email) => {
  try {
    const response = await fetch(`${Config.baseURL}/rows/table/256138/?user_field_names=true&search=${_email}&size=10`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${Config.token}`
      }
    })
    const json = await response.json();
    const status = response.status;

    return {success: true, data: json.results, status: status, count : json.count};

  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
};



export const buscar_api = async (_t) => {
  try {
    const response = await fetch(`${Config.baseURL}/rows/table/248859/?user_field_names=true&filter__field_1755894__boolean=true&search=${_t}&size=30`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${Config.token}`
      }
    })
    const json = await response.json();
    const status = response.status;

    return {success: true, data: json.results, status: status, count : json.count};

  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
};



export const relacionados_Api = async (_c) => {
  try {
    const response = await fetch(`${Config.baseURL}/rows/table/248859/?user_field_names=true&filter__field_1755894__boolean=true&filter__field_1755926__contains=${_c}&size=8`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${Config.token}`
      }
      })
    const json = await response.json();
    const status = response.status;

    return {success: true, data: json.results, status: status, count : json.count};

  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
};



export const buscar_Episodios = async (_n, _e) => {
  try {
    const response = await fetch(`${Config.baseURL}/rows/table/248862/?user_field_names=true&filter__field_1755903__boolean=true&filter__field_1755902__contains=${_e}&search=${_n}`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${Config.token}`
      }
      })
    const json = await response.json();
    const status = response.status;

    return {success: true, data: json.results, status: status, count : json.count};

  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
};


export const Criar_Usuario = async (_uid, _email, _senha, _payment ) => {
  try {
    const response = await fetch(`${Config.baseURL}/rows/table/250385/?user_field_names=true`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${Config.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        UID: _uid,
        Nome: '',
        Active: true,
        Email: _email,
        Senha: _senha,
        Pagamento: _payment,
        Total: 2
      })
    });
  
    if (!response) {
      throw new Error('Erro ao fazer a solicitação.');
    }
  
    const data = await response.json();
    console.log('Dados enviados com sucesso:', data);

  } catch (error) {
    console.error('Erro:', error);
  }
}



export const Criar_Solicitacao = async (_nome, _email, _ano ) => {
  try {
    const response = await fetch(`${Config.baseURL}/rows/table/248865/?user_field_names=true`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${Config.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Nome: _nome,
        Email: _email,
        Ano: _ano
      })
    });
  
    if (!response) {
      throw new Error('Erro ao fazer a solicitação.');
    }
  
    const data = await response.json();
    console.log('Dados enviados com sucesso:', data);

  } catch (error) {
    console.error('Erro:', error);
  }
}



export const Criar_Favs = async (_nome, _email, _url, _tipo, _cate ) => {
  try {
    const response = await fetch(`${Config.baseURL}/rows/table/256138/?user_field_names=true`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${Config.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Email: _email,
        Nome : _nome,
        Url: _url,
        Tipo : _tipo,
        Categoria : _cate
      })
    });
  
    if (!response) {
      throw new Error('Erro ao fazer a solicitação.');
    }
  
    return {success: true};

  } catch (error) {
    console.error('Erro:', error);
  }
}



export const atualizar_Views = async (row_id, visu) => {
  try {
    const response = await fetch(`${Config.baseURL}/rows/table/248859/${row_id}/?user_field_names=true`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${Config.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Visualizacoes : visu
      })
    });
  
    if (!response) {
      throw new Error('Erro ao fazer a solicitação.');
    }
  
    return {success: true};

  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
};



export const paymentVerify = async (i) => {
  try {
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${i}`, {
        method: 'GET',
        headers: {
          'X-Idempotency-Key': '0d502ed-1af6-469c-ae06-c3bec1995',
          'Authorization': 'Bearer APP_USR-384986768544-021419-530b82060e0be5-7050871'
        }
      });
    
      if (!response) {
        throw new Error('Erro ao fazer a solicitação.');
      }
    
      const res = await response.json();
      const code = response.status
      
      return {success: true, status : code, data : res.status}
  
  } catch (error) {
      console.error('Erro:', error);
      return {success: false, data: error};
  }
}


export const atualizar_Usuario = async (_id, _payment ) => {
  try {
    const response = await fetch(`${Config.baseURL}/rows/table/250385/${_id}/?user_field_names=true`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${Config.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Pagamento: _payment,
        Total: 45
      })
    });
  
    if (!response) {
      throw new Error('Erro ao fazer a solicitação.');
    }
  
    const data = await response.json();
    console.log('Dados enviados com sucesso:', data);

  } catch (error) {
    console.error('Erro:', error);
  }
}


