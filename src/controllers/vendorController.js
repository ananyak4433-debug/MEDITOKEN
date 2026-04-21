const Vendor = require('../models/vendorModel');

exports.createVendor = async (req, res) => {
    try {
        const newVendor = new Vendor(req.body);
        await newVendor.save();
        res.status(201).json('Vendor created successfully');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.status(200).json(vendors);
    } catch (err) {
        res.status(500).json('Failed to fetch vendors');
    }
};

exports.getVendorById = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        res.status(200).json(vendor);
    } catch (err) {
        res.status(500).json('Failed to fetch vendor');
    }
};

exports.updateVendor = async (req, res) => {
    try {
        const updatedVendor = await Vendor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedVendor);
    } catch (err) {
        res.status(500).json('Failed to update vendor');
    }
};

exports.deleteVendor = async (req, res) => {
    try {
        await Vendor.findByIdAndDelete(req.params.id);
        res.status(200).json('Vendor deleted successfully');
    } catch (err) {
        res.status(500).json('Failed to delete vendor');
    }
};