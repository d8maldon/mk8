    
    % Convert normalized magnitudes to indices in the colormap
    color_indices = round(B_magnitude_normalized * (size(cmap, 1) - 1)) + 1;
    arrow_colors = cmap(color_indices, :);
    
    % Plot the quiver with colored arrows
    quiver3(X, Y, Z, B_x, B_y, B_z, 'LineWidth', 1.5, 'MaxHeadSize', 0.5, 'Color', 'none');
    hold on;
    
    % Apply colors to arrows manually
    for j = 1:numel(X)
        plot3([X(j) X(j) + B_x(j)], [Y(j) Y(j) + B_y(j)], [Z(j) Z(j) + B_z(j)], ...
              'Color', arrow_colors(j,:), 'LineWidth', 1.5);
    end
    hold off;
    
    % Set axis labels and title
    xlabel('X');
    ylabel('Y');
    zlabel('Z');
    title(['Magnetic Field at Time Step ' num2str(i)]);
    
    % Set axis limits to match the grid dimensions
    xlim([0 50]);
    ylim([0 50]);
    zlim([0 50]);
    
    % Add grid and equal scaling for all axes
    grid on;
    axis equal;
    
    % Capture the plot as an image
    frame = getframe(gcf);
    im = frame2im(frame);
    [imind, cm] = rgb2ind(im, 256);
    
    % Write to the GIF File
    if i == 1
        imwrite(imind, cm, filename, 'gif', 'Loopcount', inf, 'DelayTime', 0.1);
    else
        imwrite(imind, cm, filename, 'gif', 'WriteMode', 'append', 'DelayTime', 0.1);
    end
    
    pause(0.1); % Pause to control animation speed
end
