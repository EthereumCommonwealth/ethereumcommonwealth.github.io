var data = {
    node: "https://rpc.callisto.network",
    contract: {
           address: "0xf6f29e5ba51171c4ef4997bd0208c7e9bc5d5eda",
           abicode:[{"constant":false,"inputs":[{"name":"_name","type":"string"}],"name":"remove_entry","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_who","type":"address"}],"name":"fire","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_link","type":"string"},{"name":"_metadata","type":"string"}],"name":"add_entry","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_who","type":"address"}],"name":"hire","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"string"}],"name":"get_entry","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_link","type":"string"}],"name":"is_official","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_who","type":"address"}],"name":"transfer_ownership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_name","type":"string"}],"name":"Registered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_name","type":"string"}],"name":"Removed","type":"event"}]
    }
};

$('.ui.form').form({
  fields: {
    address: {
      identifier: 'address',
      rules: [
      {
        type: 'url',
            prompt : 'Please enter a url'
      }
  ]
    }
  },
onSuccess: function(event, fields)
{
        event.preventDefault();

        $('.ui.info.message').show();
        $('.ui.active.inverted.dimmer').show();
        $('.ui.success.message').hide();
        $('.ui.negative.message').hide();

        if (isOfficial($("input#address").val()))
        {
            $('.ui.info.message').hide();
            $('.ui.success.message').show();
        }
        else
        {
            $('.ui.info.message').hide();
            $('.ui.negative.message').show();
        }

        $('.ui.active.inverted.dimmer').hide();
}});

function isOfficial(form)
{
    var address = new URL(form)
    var hostspl = address.hostname.split('.');
    var hostlst = hostspl.slice(Math.max(hostspl.length - 2, 0));
    var hostnam = hostlst.join('.');

    console.log(hostnam)

    var web3     = new Web3(new Web3.providers.HttpProvider(data.node));
    var contract = web3.eth.contract(data.contract.abicode).at(data.contract.address);

    var eacher = address.pathname.split('/');
    var pather = address.pathname.split('/');

    var status = false;

    eacher.forEach(function(item)
    {
        var path = hostnam + pather.join('/');

        console.log(path)

        if
        (
            contract.is_official("http://" + path) === true ||
            contract.is_official("https://" + path) === true ||
            contract.is_official("http://" + path + '/') === true ||
            contract.is_official("https://" + path + '/') === true
        )
        {  status = true; }

        pather.pop();
    });

    console.log(status)

    return status;
}
