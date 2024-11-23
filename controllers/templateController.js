const drive = require('../config/googleDrive');
const Template = require('../models/Template');
const Purchase = require('../models/Purchase');
const jwt = require('jsonwebtoken');

// Admin Upload Template
const uploadTemplate = async (req, res) => {
  const { name, description, category, price, fileId, thumbnail } = req.body;
  const template = new Template({
    name,
    description,
    category,
    price,
    driveFileId: fileId,
    thumbnail,
  });
  await template.save();
  res.json({ message: 'Template uploaded successfully' });
};

// User Purchase Template
const purchaseTemplate = async (req, res) => {
  const { templateId } = req.body;
  const userId = req.user.id;

  const template = await Template.findById(templateId);
  if (!template) return res.status(404).json({ error: 'Template not found' });

  const accessToken = jwt.sign({ userId, templateId }, process.env.JWT_SECRET, {
    expiresIn: '4m',
  });

  const purchase = new Purchase({
    userId,
    templateId,
    driveFileId: template.driveFileId,
    accessToken,
    expiresAt: new Date(Date.now() + 4 * 30 * 24 * 60 * 60 * 1000), // 4 months
  });

  await purchase.save();
  res.json({ accessToken });
};

// Access Template
const accessTemplate = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const purchase = await Purchase.findOne({ accessToken: token });

    if (purchase && new Date() < purchase.expiresAt) {
      const { data } = await drive.files.get({
        fileId: purchase.driveFileId,
        alt: 'media',
      });
      res.json({ fileUrl: data.webContentLink });
    } else {
      res.status(403).json({ error: 'Access expired' });
    }
  } catch {
    res.status(401).json({ error: 'Unauthorized access' });
  }
};


module.exports = {
    uploadTemplate,
     purchaseTemplate,
     accessTemplate,
};

