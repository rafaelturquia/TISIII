using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using System.Web.Services;

public partial class build_proxy : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod]
    public static Boolean GravaContato(string Nome, string Email, string Celular)
    {
        Boolean blnRetorno = false;
        Boolean JaCadastrado = false;

        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders
                  .Accept
                  .Add(new MediaTypeWithQualityHeaderValue("application/json"));

            //Valida Email já cadastrado
            var parametrosValidacao = new
            {
                Email = Email
            };
            var jsonValidacao = JsonConvert.SerializeObject(parametrosValidacao);
            var Parameters = new StringContent(jsonValidacao, Encoding.UTF8, "application/json");

            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            var response = client.PostAsync("https://www.mrv.com.br/webservice/WSImoveisMRV.svc/VerificaRegistroVilleVerdi", Parameters).Result;
            //var response = client.PostAsync("http://portalmrv.local.com/webservice/WSImoveisMRV.svc/VerificaRegistroVilleVerdi", Parameters).Result;
            if (response.IsSuccessStatusCode)
            {
                var responseContent = response.Content;
                string responseString = responseContent.ReadAsStringAsync().Result;

                JaCadastrado = Convert.ToBoolean(responseString);
            }

            if (!JaCadastrado)
            {
                //Grava Prospect
                string celular = Celular.Replace("(", string.Empty).Replace(")", string.Empty).Replace("(", string.Empty).Replace(" ", string.Empty).Replace("-", string.Empty);
                List<Telefone> listaTelefone = new List<Telefone>();
                Telefone telefone = new Telefone();
                telefone.TipoTelefone = 1;
                telefone.intDDD = Convert.ToInt32(celular.Substring(0, 2));
                telefone.intTelefone = Convert.ToInt32(celular.Substring(2));
                listaTelefone.Add(telefone);

                var parametros = new
                {
                    TxtNome = Nome,
                    TxtEmail = Email,
                    TxtMensagem = "",
                    BlnReceberNovidades = 1,
                    TxtUrlOrigem = "https://www.villeverdi.com.br/",
                    TxtTipoFaleConosco = "N",
                    idCidade = 1,
                    ReceberContato = "E-mail",
                    ListaTelefone = listaTelefone
                };

                var json = JsonConvert.SerializeObject(parametros);
                var conteudoParametros = new StringContent(json, Encoding.UTF8, "application/json");
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                response = client.PostAsync("https://www.mrv.com.br/webservice/WSImoveisMRV.svc/GravaCadastro", conteudoParametros).Result;
                //response = client.PostAsync("http://portalmrv.local.com/webservice/WSImoveisMRV.svc/GravaCadastro", conteudoParametros).Result;
                if (response.IsSuccessStatusCode)
                {
                    var responseContent = response.Content;
                    string responseString = responseContent.ReadAsStringAsync().Result;
                    blnRetorno = true;
                }
            }
            else
            {
                blnRetorno = false;
            }
        }
        return blnRetorno;

    }

    public class Telefone
    {
        public int TipoTelefone { get; set; }
        public int intDDD { get; set; }
        public int intTelefone { get; set; }
    }

    public class Contato
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Celular { get; set; }
    }
}