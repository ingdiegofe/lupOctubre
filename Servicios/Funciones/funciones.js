

function concatenarSQL(query,instruccion,simbolo){
    if(query != ""){
        query = query + simbolo + instruccion;
    }else{
        query = instruccion;
    }
    return query;
}

function validaParametro(parametro){
    if(parametro == 0){
      return true;
    }else if(parametro != "" && parametro != null && parametro != 'null'){
        return true;
    }else{
        console.log("Parametro invalido => " + parametro);
        return false;
    }
}


function logo(){
   var img;

   img = '<img alt="favicon" src="data:image/vnd.microsoft.icon;base64,R0lGODlhggCCAPf/AMnLzU' +
          '5MUZCQlEE+QkhGSsrMz3t6ftHS1D06Pri5vO7u7+np6tTV19ja20ZESDc1OfLz8+jo6To3O0RCRpaWmo6Nk' +
          'XV0eIB/hH59gdzd352doKiprKqrr6WmqaOjp5mZnaCgpK6vsq6ws6ytsK+xtJ6fop2eoaGhpaeoq6anqqip' +
          'rausr5ycoKmqrpubn6SlqKKippqanqOkqNnb3cXHyuTm5/Dx8piYnOPk5bCxtfv7+2ZlamNiZ2lobWRjaMT' +
          'GycDCxcPGyLW3uvb292xrcMLEx9LU1lhXXEpITO/w8VxbYGFgZWhnbLy+wfDx8VFPVGtqb8fJy7m6vb/BxM' +
          'PFx/j4+bu9wLa4u8HDxmBgZLGytWppbr2/wb7AwrS2ufb3987Q0trc3uDi41NSV7e4u83P0fHy877Aw7m7v' +
          'sbIy2BfY9PW1/f4+F9eY9TW2LO1uLq8v+3u7+7v8F5dYlVUWfz8/Gdma9/h4szO0NbY2tze3+zt7uvr7ExK' +
          'T+Di5Nvd3/z8/eXn6EtJTubo6fn5+ezs7ezu7+3t7t3f4dja3M7R09ze4Ors7FNRVt7g4lpZXufp6tPV111' +
          'cYc/R1FdWW21scbKztktITerq69XX2fX29t3e3+rr7HBvdOvs7U1LUPX19bO0t25tclBOU8vNz+Dh4vHy8m' +
          'JhZunq6/v8/Pv7/M/R0uPl5tfZ21lYXURBRT88QHNyd+Hj5VtaX4mIjIKBhlZVWoeGit/f4IiHi9bX2drb3' +
          'YyLj+3u7tnb3Nra2/T09JWUmENARHh3e+zt7XFwdefo6YaFiurr6+fn6IuKjszMzs3O0WVkaeLk5evs7MnM' +
          'zvT09YOCh+Lj5IqJjTs4PIGAhYWEiaamqaenqq+vsre3uq6usa+ws7a3ufn6+s3P0uXl5sLExjUzN/f3+L6' +
          '+waOjptPU19vc3ff398XFx8fKy/j4+ODg4e3t7ZaVmdfY2tbY2d7g4cbGyaurr8HCxLq6veLi4+nr7M7O0O' +
          'bm55+fo62uscjKzP///////yH5BAEAAP8ALAAAAACCAIIAAAj/AP8JHEiwoMGDBCEoWBgnTq+HhyJKPLRnD' +
          '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">';

          return img;

}


exports.concatenarSQL = concatenarSQL;
exports.validaParametro = validaParametro;
exports.logo = logo;