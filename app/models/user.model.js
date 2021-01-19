module.exports = mongoose => {
	let schema = mongoose.Schema(
		{
			name: {
				type: String,
				required: true
			},
			username: {
				type: String,
				required: true,
				unique: true
			},
			password: {
				type: String,
				required: true
			}
		},
		{ timestamps: true }
	);

	schema.method("toJSON", function() {
			const { __v, _id, ...object } = this.toObject();
			object.id = _id;
			return object;
	});

	const User = mongoose.model("user", schema);
	return User;
};
