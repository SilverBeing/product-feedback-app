import { useDispatch, useSelector } from "react-redux";
import {
	category,
	description,
	id,
	selectFeedback,
	setCategory,
	setDescription,
	setId,
	setStatus,
	setTitle,
	status,
	title,
} from "./feedbackSlice";
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Heading,
	Input,
	Text,
	Textarea,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { allFeedback, deleteFeedback } from "../allFeedback/allFeedbackSlice";
import { useNavigate } from "react-router-dom";
import editIcon from "../../assets/others/icon-edit-feedback.svg";
import addIcon from "../../assets/others/icon-new-feedback.svg";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
export default function FeedbackForm({ action, edit }) {
	const dispatch = useDispatch();
	const feedback_title = useSelector(title);
	const [dropdown, setDropdown] = useState(false);
	const [toggle, setToggle] = useState(false);
	const feedback_description = useSelector(description);
	const feedbackAll = useSelector(selectFeedback);
	const feedback_category = useSelector(category);
	const feedback_status = useSelector(status);
	const categories = ["feature", "UI", "UX", "enhancement", "bug"];
	const statues = ["suggestion", "live", "planned", "in-progress"];
	const feedback_id = useSelector(id);
	const all_feedbacks = useSelector(allFeedback);
	const naviagate = useNavigate();
	const handleCategory = (cat) => {
		dispatch(setCategory(cat));
	};
	const handleStatus = (cat) => {
		dispatch(setStatus(cat));
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		action(feedbackAll);
		naviagate("/");
	};
	const goBack = () => {
		naviagate(-1);
	};

	useEffect(() => {
		const handleIds = () => {
			!feedback_id && !edit && dispatch(setId(all_feedbacks.length + 1));
		};
		handleIds();
	}, [dispatch, feedback_id, all_feedbacks, edit]);
	const handleDelete = () => {
		dispatch(deleteFeedback(feedback_id));
		naviagate("/");
	};

	return (
		<Flex
			alignItems="center"
			justify="center"
			padding="100px 0"
			flexDirection="column">
			<Box alignSelf="flex-start" w={{ base: "95%", lg: "40%" }} m="auto">
				<Button
					color="brandPurple"
					colorScheme="none"
					fontSize="14px"
					leftIcon={<MdKeyboardArrowLeft style={{ fontSize: "18px" }} />}
					fontWeight="700"
					mb="20px"
					onClick={goBack}>
					Go Back
				</Button>
			</Box>
			<Box padding="40px" w={{ base: "95%", lg: "40%" }} m="auto" bg="white">
				<Box>
					<img
						src={edit ? editIcon : addIcon}
						alt=""
						style={{ position: "relative", top: "-60px", width: "60px" }}
					/>
					<Heading
						fontSize="25px"
						mb="50px"
						fontWeight="800"
						color="brandHeadingColor">
						{edit ? `Editing '${feedback_title}'` : "Create Feedback"}
					</Heading>
				</Box>
				<form onSubmit={handleSubmit}>
					<FormControl mb="28px" isRequired>
						<FormLabel
							fontSize="16px"
							mb="3px"
							color="brandHeadingColor"
							fontWeight="700">
							Feedback Title
						</FormLabel>
						<Text
							fontSize="14px"
							color="brandHeadingColor"
							fontWeight="500"
							mb="10px">
							Add a short, descriptive headline
						</Text>
						<Input
							value={feedback_title}
							fontSize="14px"
							bg="brandTextbgColor"
							color="brandHeadingsColor"
							onChange={(e) => dispatch(setTitle(e.target.value))}
						/>
					</FormControl>
					<FormControl isRequired>
						<FormLabel
							fontSize="16px"
							color="brandHeadingColor"
							mb="3px"
							fontWeight="700">
							Category
						</FormLabel>
						<Text
							fontSize="14px"
							color="brandHeadingColor"
							fontWeight="500"
							mb="10px">
							Choose a category for your feedback
						</Text>
						<Flex
							position="relative"
							mb="28px"
							onClick={() => setDropdown(!dropdown)}
							justify="space-between"
							w="100%"
							bg="brandTextbgColor"
							padding="12px"
							borderRadius="10px"
							alignItems="center">
							<Text
								color="brandTextColor"
								fontSize="14px"
								textTransform="capitalize">
								{feedback_category || "Category"}
							</Text>
							<RiArrowDropDownLine />
							{dropdown && (
								<Box
									position="absolute"
									top="60px"
									w="95%"
									borderRadius="10px"
									left="50%"
									transform="translateX(-50%)"
									boxShadow="0px 0px 30px 1px rgba(0, 0, 0, 0.1)"
									bg="white"
									zIndex="9"
									padding="20px 0">
									{categories.map((cat, i) => (
										<Button
											display="flex"
											textAlign="left"
											fontSize="14px"
											textTransform="capitalize"
											w="100%"
											h="50px"
											alignItems="center"
											justifyContent="space-between"
											colorScheme="none"
											borderRadius="0px"
											color="brandTextColor"
											borderBottom="1px solid #F2F4FF"
											key={i}
											onClick={() => handleCategory(cat)}>
											{cat}
											{feedback_category === cat && (
												<BsCheckLg style={{ color: "#ad1fea" }} />
											)}
										</Button>
									))}
								</Box>
							)}
						</Flex>
					</FormControl>
					{edit && (
						<FormControl>
							<FormLabel
								fontSize="16px"
								color="brandHeadingColor"
								mb="3px"
								fontWeight="700">
								Update Status
							</FormLabel>
							<Text
								fontSize="14px"
								color="brandTextColor"
								fontWeight="500"
								mb="10px">
								Change feature state
							</Text>
							<Flex
								position="relative"
								mb="28px"
								onClick={() => setToggle(!toggle)}
								justify="space-between"
								w="100%"
								bg="brandTextbgColor"
								padding="12px"
								borderRadius="10px"
								alignItems="center">
								<Text
									color="brandTextColor"
									fontSize="14px"
									textTransform="capitalize">
									{feedback_status || "Category"}
								</Text>
								<RiArrowDropDownLine />
								{toggle && (
									<Box
										position="absolute"
										top="60px"
										w="95%"
										borderRadius="10px"
										left="50%"
										transform="translateX(-50%)"
										boxShadow="0px 0px 30px 1px rgba(0, 0, 0, 0.1)"
										bg="white"
										zIndex="9"
										padding="20px 0">
										{statues.map((cat, i) => (
											<Button
												display="block"
												textAlign="left"
												fontSize="14px"
												textTransform="capitalize"
												w="100%"
												h="50px"
												colorScheme="none"
												borderRadius="0px"
												color="brandTextColor"
												borderBottom="1px solid #F2F4FF"
												key={i}
												onClick={() => handleStatus(cat)}>
												{cat}
											</Button>
										))}
									</Box>
								)}
							</Flex>
						</FormControl>
					)}

					<FormControl mb="50px" isRequired>
						<FormLabel
							fontSize="16px"
							color="brandHeadingColor"
							mb="3px"
							fontWeight="700">
							Feedback Detail
						</FormLabel>
						<Text
							fontSize="14px"
							color="brandTextColor"
							fontWeight="500"
							mb="10px">
							Include any specific comments on what should be improved, added,
							etc
						</Text>
						<Textarea
							value={feedback_description}
							rows={3}
							fontSize="14px"
							color="brandHeadingColor"
							bg="brandTextbgColor"
							onChange={(e) => dispatch(setDescription(e.target.value))}
						/>
					</FormControl>
					<Flex
						justify="space-between"
						flexWrap="wrap"
						alignItems="center"
						w="100%">
						{edit && (
							<Button
								bg="red"
								colorScheme="none"
								color="white"
								w={{ base: "100%", md: "auto" }}
								size="lg"
								onClick={handleDelete}>
								Delete
							</Button>
						)}
						<HStack
							w={{ base: "100%", md: "auto" }}
							mt={{ base: "16px", md: "0" }}
							ml={{ base: "0", md: "auto" }}
							flexWrap="wrap">
							<Button
								onClick={() => naviagate("/")}
								size="lg"
								colorScheme="none"
								w={{ base: "100%", md: "auto" }}
								color="white"
								bg="brandHeadingColor">
								Cancel
							</Button>
							<Button
								size="lg"
								type="submit"
								colorScheme="none"
								w={{ base: "100%", md: "auto" }}
								color="white"
								bg="brandPurple">
								{edit ? "Save Changes" : "Add Feedback"}
							</Button>
						</HStack>
					</Flex>
				</form>
			</Box>
		</Flex>
	);
}
FeedbackForm.propTypes = {
	action: PropTypes.func,
	edit: PropTypes.bool,
};
