const cohereapi = require("../cohereapi");
const db = require("../models");
const Story = db.Story;
const Genre = db.Genre;
const Language = db.Language;
const Role = db.Role;
const Theme = db.Theme;
const Size = db.Size;
const Member = db.Member;
const Setting = db.Settings;

async function checkOrCreateGenre(genreText) {
  genreText = genreText.toLowerCase();
  let genre = await Genre.findOne({ where: { genreName: genreText } });
  if (!genre) {
    genre = await Genre.create({ genreName: genreText });
  }
  console.log("genree",JSON.stringify(genre))
  return genre.genreId;
}

async function getSize(sizeId) {
  let size = await Size.findByPk(sizeId);
  if (!size) return -1;
  return size.number;
}

async function checkOrCreateLanguage(languageText) {
  languageText = languageText.toLowerCase();
  let language = await Language.findOne({ where: { languageName: languageText } });
  if (!language) {
    language = await Language.create({ languageName: languageText });
  }
  return language.languageId;
}

async function checkOrCreateRole(roleText) {
  roleText = roleText.toLowerCase();
  let role = await Role.findOne({ where: { roleName: roleText } });
  if (!role) {
    role = await Role.create({ roleName: roleText });
  }
  return role.roleId;
}

async function checkOrCreateTheme(themeText) {
  themeText = themeText.toLowerCase();
  let theme = await Theme.findOne({ where: { themeName: themeText } });
  if (!theme) {
    theme = await Theme.create({ themeName: themeText });
  }
  return theme.themeId;
}

async function checkOrCreateSetting(settingText) {
  settingText = settingText.toLowerCase();
  let setting = await Setting.findOne({ where: { name: settingText } });
  if (!setting) {
    setting = await Setting.create({ name: settingText });
  }
  return setting.id;
}

// Create and Save a new Story
exports.create = async (req, res) => {

  try {
    const { genre, language, role, theme, sizeId, settings, memberId } = req.body;
    let genreId, languageId, roleId, themeId, sizeNumber, settingId;

    if (!memberId) {
      throw Error("memberId not found in the request body.")

    }

    let member = await Member.findByPk(memberId);
    if (!member) {
      throw Error("member does not exist.")
    }

    if (genre) 
      genreId = await checkOrCreateGenre(genre);

    if(settings) 
      settingId = await checkOrCreateSetting(settings);

    if (language)
     languageId = await checkOrCreateLanguage(language);
    
    if (role)
     roleId = await checkOrCreateRole(role);

    if (theme)
     themeId = await checkOrCreateTheme(theme);

    if (sizeId)
     sizeNumber = await getSize(sizeId)

    if (sizeNumber == -1) {
      res.status(401).send({
        message: "Size does not exist."
      });
    } 

    const generatedText = await cohereapi({...req.body, size: sizeNumber});

    const story = {
      memberId: req.body.memberId,
      genreId: genreId,
      languageId: languageId,
      roleId: roleId,
      themeId: themeId,
      story: generatedText,
      settingsId: settingId
    };
    console.log("story",JSON.stringify(story))
    
    Story.create(story)
      .then(data => res.send(data))
      .catch(err => res.status(500).send({
        message: err.message || "Some error occurred while creating the Story."
      }));
  }
  catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the Bedtime Story.",
    });
  }

};

// Retrieve all Stories from the database.
exports.findAll = (req, res) => {

  Story.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
      message: err.message || "Some error occurred while retrieving stories."
    }));
};

exports.findAllSizes = (req, res) => {
  Size.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
      message: err.message || "Some error occurred while retrieving sizes."
    }));
}; 

// Find a single Story with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Story.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Cannot find Story with id=${id}.` });
      }
    })
    .catch(err => res.status(500).send({
      message: err.message || "Error retrieving Story with id=" + id
    }));
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Story.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Story was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete Story with id=${id}. Maybe Story was not found!` });
      }
    })
    .catch(err => res.status(500).send({
      message: err.message || "Could not delete Story with id=" + id
    }));
};

exports.deleteAll = (req, res) => {
  Story.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} Stories were deleted successfully!` }))
    .catch(err => res.status(500).send({
      message: err.message || "Some error occurred while removing all stories."
    }));
};