const Contato = require("../models/ContatoModel");

exports.index = (req, res) => {
  res.render("contato", { contato: {} });
};

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();

    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      req.session.save(() => {
        console.log(contato.errors);
        res.redirect("index");
      });
      return;
    }

    req.flash("success", "Contato registrado.");
    req.session.save(() => res.redirect(`/`));
    // req.session.save(()=>res.redirect(`/contato/index/${contato.contato.id}`));
    return;
  } catch (e) {
    console.log(e);
    return res.render("pagError");
  }
};

exports.editIndex = async (req, res) => {
  if (!req.params.id) return res.render("pagError");

  const contato = await Contato.buscaId(req.params.id);
  if (!contato) return res.render("pagError");

  res.render("contato", { contato });
};

exports.edit = async (req, res) => {
  try {
    console.log("primeiro é solicitado aqui. (chegou ao exports.edit)");
    if (!req.params.id) return res.render("pagError");
    const contato = new Contato(req.body);
    await contato.edit(req.params.id);

    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      req.session.save(() => res.redirect("back"));
      return;
    }
    req.flash("success", "Contato editado.");
    req.session.save(() =>
      res.redirect(`/contato/index/${contato.contato.id}`)
    );
    return;
  } catch (e) {
    res.redner("pagError");
  }
};

exports.delete = async function (req, res) {
  try {
    if (!req.params.id) return res.render("pagError");
    const contato = await Contato.delete(req.params.id);
    if (!contato) return res.render("pagError");

    req.flash("success", "Deletado.");
    req.session.save(() => res.redirect("back"));
  } catch (e) {
    req.flash("error", "Falha ao deletar", e);
  }
};
