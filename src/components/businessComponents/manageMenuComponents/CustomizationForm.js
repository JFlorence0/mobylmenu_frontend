import React from "react";

const CustomizationForm = ({ groups = [], setGroups, maxGroupsLimit = 5, maxOptionsLimit = 10 }) => {
    const addGroup = () => {
        const lastGroup = groups[groups.length - 1];
        if (!lastGroup?.name || (lastGroup.options && lastGroup.options.length === 0)) {
            alert("Please provide a name and at least one option for the current group.");
            return;
        }

        setGroups([
            ...groups,
            {
                id: null,
                name: "",
                required: false,
                minSelections: 1,
                maxSelections: 1,
                options: [],
            },
        ]);
    };

    const removeGroup = (index) => {
        setGroups(groups.filter((_, groupIndex) => groupIndex !== index));
    };

    const updateGroup = (index, field, value) => {
        setGroups(
            groups.map((group, groupIndex) =>
                groupIndex === index ? { ...group, [field]: value } : group
            )
        );
    };

    const addOption = (groupIndex) => {
        setGroups(
            groups.map((group, index) =>
                index === groupIndex
                    ? {
                          ...group,
                          options: [
                              ...(group.options || []),
                              { id: null, name: "", priceModifier: "", description: "" },
                          ],
                      }
                    : group
            )
        );
    };

    const removeOption = (groupIndex, optionIndex) => {
        setGroups(
            groups.map((group, index) =>
                index === groupIndex
                    ? {
                          ...group,
                          options: group.options.filter((_, optIndex) => optIndex !== optionIndex),
                      }
                    : group
            )
        );
    };

    const updateOption = (groupIndex, optionIndex, field, value) => {
        setGroups(
            groups.map((group, index) =>
                index === groupIndex
                    ? {
                          ...group,
                          options: group.options.map((option, optIndex) =>
                              optIndex === optionIndex ? { ...option, [field]: value } : option
                          ),
                      }
                    : group
            )
        );
    };

    return (
        <div className="customization-form">
            {groups.map((group, groupIndex) => (
                <div key={groupIndex} className="group-container">
                    <h3>Customizable Group</h3>
                    <button className="remove-button" onClick={() => removeGroup(groupIndex)}>
                        Remove Group
                    </button>
                    <input
                        type="text"
                        className="input"
                        placeholder="IE: Choose A Base..."
                        value={group.name}
                        onChange={(e) => updateGroup(groupIndex, "name", e.target.value)}
                    />
                    <div className="toggle-container">
                        <label>
                            Choice Required
                            <input
                                type="checkbox"
                                checked={group.required}
                                onChange={(e) => updateGroup(groupIndex, "required", e.target.checked)}
                            />
                        </label>
                    </div>
                    <div className="selections-container">
                        <div>
                            <label>Minimum Required</label>
                            <input
                                type="number"
                                className="numeric-input"
                                value={group.minSelections}
                                onChange={(e) => updateGroup(groupIndex, "minSelections", Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <label>Maximum Required</label>
                            <input
                                type="number"
                                className="numeric-input"
                                value={group.maxSelections}
                                onChange={(e) => updateGroup(groupIndex, "maxSelections", Number(e.target.value))}
                            />
                        </div>
                    </div>
                    <h4>Customizable Options</h4>
                    {group.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="option-container">
                            <button className="remove-button" onClick={() => removeOption(groupIndex, optionIndex)}>
                                Remove Option
                            </button>
                            <input
                                type="text"
                                className="input"
                                placeholder="Option Name: White Rice, Brown Rice, etc..."
                                value={option.name}
                                onChange={(e) => updateOption(groupIndex, optionIndex, "name", e.target.value)}
                            />
                            <label>Price</label>
                            <input
                                type="number"
                                className="price-input"
                                placeholder="Leave blank if no charge"
                                value={option.priceModifier}
                                onChange={(e) => updateOption(groupIndex, optionIndex, "priceModifier", e.target.value)}
                            />
                            <input
                                type="text"
                                className="input"
                                placeholder="Description"
                                value={option.description}
                                onChange={(e) => updateOption(groupIndex, optionIndex, "description", e.target.value)}
                            />
                        </div>
                    ))}
                    {group.options.length < maxOptionsLimit && (
                        <button className="add-button" onClick={() => addOption(groupIndex)}>
                            + Add Option
                        </button>
                    )}
                </div>
            ))}
            {groups.length < maxGroupsLimit && (
                <button className="add-button" onClick={addGroup}>
                    + Add Group
                </button>
            )}
        </div>
    );
};

export default CustomizationForm;